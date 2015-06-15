import React from "react";
import rpc from "./rpc";
import _ from "lodash";

export default class Files extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: this.props.open||false,
			contents: []
		};

		_.bindAll(this);
	}

	refreshContents() {
		var self = this;
		return rpc.Call("Files.Ls", this.props.path)
		.then(function(result){
			self.setState({contents: result});
		});
	}

	componentDidMount() {
		if (this.props.isDir && this.props.open) {
			this.refreshContents();
		}
	}

	toggleOpen() {
		this.setState({open: !this.state.open});
		this.refreshContents();
	}

	render() {
		console.log(this);
		var self = this;
		if (this.props.isDir) {
			if (!this.state.open) {
				return <div className="files-item" onClick={this.toggleOpen.bind(this)}>
					<span className="files-icon chevron glyphicon glyphicon-chevron-right"></span>
					<span className="files-icon glyphicon glyphicon-folder-close"></span>
					<span className="files-label">{this.props.name}</span>
				</div>
			}

			var icon = <div className="files-item" onClick={this.toggleOpen.bind(this)}>
				<span className="files-icon chevron glyphicon glyphicon-chevron-down"></span>
				<span className="files-icon glyphicon glyphicon-folder-open"></span>
				<span className="files-label">{this.props.name}</span>
			</div>

			var contents = _.map(this.state.contents, function(item){
				var newPath = self.props.path + "/" + item.Name;
				return <li key={item.Name}><Files isDir={item.IsDir} path={newPath} name={item.Name} /></li>
			});

			return <div>
				{icon}
				<ul className="files-dir list-unstyled">
					{contents}
				</ul>
			</div>

		} else {
			return <div className="files-item">
				<span className="files-icon glyphicon glyphicon-file"></span>
				<span className="files-label">{this.props.name}</span>
			</div>
		}

	}
}
