/** @jsx React.DOM */
var Editor = React.createClass({displayName: "Editor",
	render: function() {
		return (
			React.createElement("ul", null, 
				React.createElement("li", null, "ggrgr"), 
				React.createElement("li", null, "ggg")
			)

		)
	}
});

React.renderComponent(React.createElement(Editor, null), document.getElementById('content'));