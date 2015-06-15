import _ from "lodash";

var serialI = 0;

function genSerial() {
    return serialI++;
}

export default class Message {
    constructor() {
        var priv = {
            serial: genSerial();
            body: [],
            type: "",
            headers {},
        };

        this.isValid = _.bind(priv, this.isValid);
        this.serial = _.bind(priv, this.serial);
        this.toString = _.bind(priv, this.toString);
        this.body = _.bind(priv, this.body);
        this.type = _.bind(priv, this.type);
        this.headers = priv.headers;
        Object.freeze(this);
    }

    // type gets or sets the message type
    type(val) {
        if (_.isUndefined(val)) {
            return this.type;
        }
        assert(_.isString(val), "type must be a string");
        this.type = val;
    }

    // body gets or sets the value of body
    body(val) {
        if (_.isUndefined(val)) {
            return this.body;
        }
        assert(_.isArray(val), "body must be an array");
        this.body = val;
    }

    // isValid will throw an exception if the message is not valid
    isValid() /* boolean */ {
        assert(_.isObject(this.headers), "headers object is missing or not an object");
        assert(_.isArray(this.body), "body is missing or not an array");
    }

    // serial returns the message's serial number
    serial() /* number */ {
        return this.serial;
    }

    // returns the string representation of the message
    toString() {
        var err = _.attempt(_.bind(isValid, this));
        if (err instanceof Error) {
            return "Message< invalid >";
        }

        var s = "Message< " + this.type;
        s = appendField(this, s, "sender");
        s = appendField(this, s, "dest");
        s += " serial " + this.serial;
        s = appendField(this, s, "reply_serial");
        s = appendField(this, s, "path");
        s = appendField(this, s, "error");
        s = appendField(this, s, "member");

        if (this.pub.body.length > 0) {
            s += "\n";
        }

        s += _.map(this.body, function(item){
            return "  " + item;
        }).join("\n");

        return s + " >";
    }

    appendField(self, str, name) {
        if (_.has(self.headers, name)) {
            str += " " + name + " " + self.headers[name];
        }
        return str;
    }
}

exports.Message = Message;
