var React = require("react");
var _ = require("lodash");

module.exports = React.createClass({
    render: function() {
        return <div className="tab-panel">
            <ul className="tab-bar list-inline">
                <li>leaderboard.js</li>
                <li>main.css</li>
            </ul>
            <div className="tab-content"></div>
        </div>
    }
});
