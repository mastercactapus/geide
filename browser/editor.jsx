import React from "react";
import AceEditor from "react-ace";
var uIdn = 0;

require('brace/mode/golang');
require('brace/theme/monokai');


export default class Editor extends React.Component {
	getInitialState() {
		return {
			id: "_editor" + uIdn++
		}
	}

	render(){
		return <div id={this.state.id} className="editor">
		  <AceEditor
		    mode="golang"
		    theme="monokai"
		    name={this.state.id}
		  />
		</div>
	}
}
