/** @jsx React.DOM */

var MainContent = React.createClass({displayName: "MainContent",
	getInitialState: function() {
		return {
			text: ''
		}
	},
	handleSubmit: function(e) {
		e.preventDefault();
	},
	render: function() {
		return (
			React.createElement("form", null, 
				React.createElement("input", {type: "text", placeholder: "Search"}), 
				React.createElement("button", null, "submit")
			)
		)
	}
});

React.renderComponent(React.createElement(MainContent, null), document.getElementById('content'));

