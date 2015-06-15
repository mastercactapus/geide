#!/usr/bin/env fish

# start live-reload in the background
if not type -P webpack-dev-server ^/dev/null >/dev/null
	echo "Installing webpack-dev-server with npm"
	npm install -g webpack-dev-server
end
webpack-dev-server --inline --content-base=./public -h --devtool sourcemap --output-pathinfo &

go build
and ./geide -v run --content-url=http://localhost:8080

killall node
