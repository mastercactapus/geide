.PHONY: run

run: geide.bin
	./geide.bin -v run

geide.bin: public/bundle.js geide/*.go
	go build -o geide.bin ./geide/

public/bundle.js: browser/* package.json
	webpack --progress -c
