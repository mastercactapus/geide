import _ from "lodash";
import Bluebird from "bluebird";
import assert from "assert";
import Conn from "./conn";

// JbusObject represents a remote object on which methods can be invoked.
export default class JbusObject {
    constructor(conn, dest, path) {
        // don't accept silliness, correct it :)
        assert(this instanceof JbusObject, "JbusObject must be called with the 'new' keyword");
        assert(_.isString(dest), "dest must be a string");
        assert(_.isString(path), "path must be a string");
        assert(!_.isEmpty(dest), "dest must not be empty");
        assert(!_.isEmpty(path), "path must not be empty");
        assert(conn instanceof Conn, "conn must be an instance of a connection");

        var priv = {
            conn: conn,
            dest: dest,
            path: path
        };

        this.call = _.bind(this.call, priv);
        this.path = _.bind(this.path, priv);
        this.destination = _.bind(this.destination, priv);
        this.getProperty = _.bind(this.getProperty, this);

        Object.freeze(this);
    }

    // Call calls a method and returns a promise for the reply
    call(method, flags, arg) { //promise
        assert(_.isString(method), "method must be a string");
        throw new Error("not implemented");
    }

    // Destination returns the destination that calls on the object are sent to.
    destination() { //string
        return this.dest;
    }

    // Path returns the path that calls are sent to.
    path() { //string
        return this.path;
    }

    // getProperty returns the property with name p
    getProperty(p) { // promise
        assert(_.isString(p), "property name must be a string");
        return this.call("getProperty", null, p);
    }

}
