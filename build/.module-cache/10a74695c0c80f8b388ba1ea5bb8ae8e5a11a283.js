/** @jsx React.DOM */

var MainContent = React.createClass({displayName: "MainContent",
	render: function() {
		return (
			React.createElement("input", {type: "text"})
		)
	}
});

React.renderComponent(React.createElement(MainContent, null), document.getElementById('content'));

