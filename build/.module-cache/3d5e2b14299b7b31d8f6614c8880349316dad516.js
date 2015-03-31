/** @jsx React.DOM */

var MainContent = React.createClass({displayName: "MainContent",
	getInitialState: function() {
		return {
			text: ''
		}
	},
	handleSubmit: function(e) {
		e.preventDefault();
		console.log(this.state.text);
	},
	onChange: function(e) {
		this.setState({text: e.target.value})
	},
	render: function() {
		return (
			React.createElement("form", {onSubmit: this.handleSubmit}, 
				React.createElement("input", {type: "text", placeholder: "Search", onChange: this.onChange, value: this.state.text}), 
				React.createElement("button", null, "submit")
			)
		)
	}
});

React.renderComponent(React.createElement(MainContent, null), document.getElementById('content'));

