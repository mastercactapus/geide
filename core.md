## Core Message Bus

### /core/file/activate




## Core Plugins

### File Browser

plugin.js:

{
	id: "core.filebrowser",
	name: "File Browser",
	description: "Browse and manage files on the filesystem",

	rpc: ["Files.v1"],

	state: {
		type: "object",
		properties: {
			path: {
				type: "string",
			},
			openPaths: {
				type: "array",
				items: {
					type: "string",
				},
			},
			favorites: {
				type: "array",
				items: {
					type: "object",
					properties: {
						path: {
							type: "string",
						},
						openPaths: {
							type: "array",
							items: {
								type: "string",
							},
						},
					},
				},
			},
		},
	},

	config: {
		type: "object",
		properties: {
			animate: {
				title: "Enable Animations"
				type: "boolean",
				description: "Animate directory lists when opening/closing",
				default: true,
			},
		},
	},

	events: {
		publish: [
			"/core/file/activate"
		]
	},

}

