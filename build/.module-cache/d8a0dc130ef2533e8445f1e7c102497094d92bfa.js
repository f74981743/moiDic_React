/** @jsx React.DOM */

var MainContent = React.createClass({displayName: "MainContent",
	render: function() {
		return (
			React.createElement("div", {id: "MainContent"}
			)
		)
	}
});


React.renderComponent(React.createElement(MainContent, null), document.getElementById('content'));

