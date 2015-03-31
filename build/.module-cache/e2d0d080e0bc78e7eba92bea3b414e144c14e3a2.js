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
	onChange: function() {

	},
	render: function() {
		return (
			React.createElement("form", {onSubmit: this.handleSubmit}, 
				React.createElement("input", {type: "text", placeholder: "Search", onChange: this.onChange}), 
				React.createElement("button", null, "submit")
			)
		)
	}
});

React.renderComponent(React.createElement(MainContent, null), document.getElementById('content'));

