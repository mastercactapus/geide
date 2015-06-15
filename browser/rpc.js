var Bluebird = require("bluebird");
var _ = require("lodash");

function RPC(url) {
	var self = this;
	this.t = new WebSocket(url);
	this._ready = new Bluebird(function(resolve,reject){
		self.t.onopen = resolve;
	});
	this._i = 0;
	this.Call = _.bind(this.Call, this);
	this.t.onmessage = _.bind(this._done, this);
	this.pending = [];
}
RPC.prototype = {
	Call: function(name, _args) {
		var id = this._i++;
		var self = this;
		var args = _.isArray(_args) ? _args : [_args];
		return this._ready.then(function(){
			return Bluebird.fromNode(function(cb){
				self.pending[id] = _.once(cb);
				self.t.send(JSON.stringify({method: name, params: args, id: id}));
			});
		});
	},
	_done: function(msg) {
		var res = JSON.parse(msg.data);
		if (_.has(res, "result") && _.has(res, "error")) {
			var cb = this.pending[res.id];
			if (!cb) return;
			cb(res.error, res.result);
		}
	}
}

var wspath = "ws://" + window.location.host + window.location.pathname.replace(/\/?$/, "/") + "rpc";
module.exports = new RPC(wspath);
window.rpc = module.exports;