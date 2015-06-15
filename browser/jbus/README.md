# jbus

D-Bus inspired communication in javascript

jbus is used for plugin-to-plugin communication in the IDE.


## interfaces

An interface defines a particular interface for an object with the following fields:

- `name` a name for this interface
- `methods` method definitions
- `signals` signals that can be emitted
- `properties` properties that are available
- `annotations` additional key/value strings

### name

`name` should be unique (e.g. *geide.rpc.Files*)

### methods

A method is defined with `name`, `args`, `returns` and `annotations`

args are validated via json schema, with the additional requirement of a top-level unique name

See the following example from the Files api:

```javascript
{
    name: "Ls",
    args: [{
        name: "path"
        type: "string"
    }],
    returns: [{
        name: "contents",
        type: "array",
        items: {
            type: "object",
            properties: {
                isDir: {
                    type: "boolean"
                },
                name: {
                    type: "string"
                }
            }
        }
    }],
    annotations: {
        description: "add a favorite path to the file browser"
    }
}

```

### signals

A signal is defined the same way as methods without a `returns` definition

### properties

`access` may be `read` `write` or `readwrite`

Example of a property from the tabpanel
```javascript
{
    name: "activeTab",
    type: "integer",
    access: "readwrite",
    annotations: {
        description: "active tab index"
    }
}
