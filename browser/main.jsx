import React from "react";

import Files from "./files.jsx";
import TabPanel from "./tabpanel.jsx";
import {} from "./main.css";

React.render(
	<div>
		<TabPanel />
		<span>
			<Files isDir="true" path="." name="geide" open="true" />
		</span>
	</div>,
	document.getElementById("app")
);
