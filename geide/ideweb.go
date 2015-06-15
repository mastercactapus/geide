package main

import (
	"html/template"
	"io"
	"io/ioutil"
	"net/http"
	"net/rpc"
	"net/rpc/jsonrpc"
	"os"
	"path/filepath"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/kardianos/osext"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/websocket"
)

type Config struct {
	GOPATH           string
	GOROOT           string
	WorkingDirectory string
	ContentURL       string
}

type handler struct {
	c Config
	t *template.Template
	r *rpc.Server
}

type FilesAPI struct {
	base string
}
type FileInfo struct {
	IsDir   bool
	Mode    string
	ModTime time.Time
	Name    string
	Size    int64
}

func NewWebHandler(c Config) http.Handler {
	dir, err := osext.ExecutableFolder()
	if err != nil {
		panic(err)
	}

	t := template.Must(template.ParseGlob(filepath.Join(dir, "browser", "*.html")))
	h := &handler{
		c,
		t,
		rpc.NewServer(),
	}
	h.r.RegisterName("Files", &FilesAPI{filepath.Clean(c.WorkingDirectory)})

	router := mux.NewRouter()
	router.HandleFunc("/", h.mainPage)
	router.Handle("/rpc", websocket.Handler(h.rpc))
	router.PathPrefix("/").Handler(http.FileServer(http.Dir(filepath.Join(dir, "public"))))
	return handlers.LoggingHandler(os.Stdout, router)
}
func (h *handler) rpc(ws *websocket.Conn) {
	h.r.ServeCodec(jsonrpc.NewServerCodec(ws))
}

func (r *FilesAPI) Ls(path *string, reply *[]FileInfo) error {
	inf, err := ioutil.ReadDir(*path)
	if err != nil {
		return err
	}
	contents := make([]FileInfo, len(inf))
	for i, f := range inf {
		m := f.Mode()
		contents[i] = FileInfo{
			IsDir:   f.IsDir(),
			Mode:    m.String(),
			Name:    f.Name(),
			Size:    f.Size(),
			ModTime: f.ModTime(),
		}
	}
	*reply = contents
	return nil
}

func (h *handler) mainPage(res http.ResponseWriter, req *http.Request) {
	err := h.t.ExecuteTemplate(res, "index.html", h.c)
	if err != nil {
		log.Errorln("mainPage:", err)
		res.WriteHeader(500)
		io.WriteString(res, err.Error())
	}
}
