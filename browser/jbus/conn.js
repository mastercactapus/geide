

export default class Conn {
    constructor() {

    }

    // close closes the connection. Any pending requests will be rejected
    // and eavesdrop and signal handlers are unregistered.
    close() {

    }

    // eavesdrop causes all messages to be sent to the handler.
    // replies, errors, and signals will not be sent to their respective
    // destinations. if handler is null, normal operation will be restored.
    eavesdrop(handler) {
        if (handler === null) {

        }
        assert(_.isFunction(handler), "handler must be a function");
    }

    // emit will emit a signal on the message bus.
    // path is the Object path
    // name is the interface/schema name
    emit(path, name, value) {

    }

    // export registers the given object on the message bus.
    export(obj, path, interface) {

    }
}
