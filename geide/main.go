package main

import (
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"net"
	"net/http"
	"os"
)

func main() {
	var (
		contentURL  string
		bindAddress string
		verbose     bool

		mainCmd = &cobra.Command{
			PersistentPreRun: func(cmd *cobra.Command, args []string) {
				if verbose {
					log.SetLevel(log.DebugLevel)
				}
			},
		}
		runCmd = &cobra.Command{
			Use: "run",
			Run: func(cmd *cobra.Command, args []string) {
				c := Config{}
				c.GOPATH = os.Getenv("GOPATH")
				c.GOROOT = os.Getenv("GOROOT")

				var dir string
				var err error
				if len(args) > 0 {
					dir = args[0]
				} else {
					dir, err = os.Getwd()
					if err != nil {
						log.Fatalln("Could not get working directory:", err)
					}
				}

				c.WorkingDirectory = dir
				c.ContentURL = contentURL
				h := NewWebHandler(c)
				l, err := net.Listen("tcp", bindAddress)
				if err != nil {
					log.Fatalln("Could not bind:", bindAddress, err)
				}
				log.Infoln("Listening:", l.Addr().String())
				log.Fatalln(http.Serve(l, h))
			},
		}
	)

	mainCmd.PersistentFlags().BoolVarP(&verbose, "verbose", "v", false, "Verbose output")
	runCmd.PersistentFlags().StringVar(&contentURL, "content-url", "", "Content URL. Sets content url, allowing to host from another service (e.g. webpack)")
	runCmd.PersistentFlags().StringVarP(&bindAddress, "bind-address", "b", ":8000", "Binding address. Specifies the address and/or port to listen on")
	mainCmd.AddCommand(runCmd)
	mainCmd.Execute()
}
