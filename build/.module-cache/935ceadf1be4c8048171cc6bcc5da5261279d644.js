/** @jsx React.DOM */

var Dic = React.createClass({displayName: "Dic",
	render: function() {
		return (
			React.createElement("div", null, 
				this.props.items
			)
		)
	}
});

var MainContent = React.createClass({displayName: "MainContent",
	getInitialState: function() {
		return {
			items: {},
			text: ''
		};
	},
	handleSubmit: function(e) {
		e.preventDefault();
		$.ajax({
		  url: 'https://www.moedict.tw/uni/' + this.state.text,
		  dataType: "json",
		  success: function(result) {
		    this.state.items = result;
		    console.log(this.state.items);
		  }
		});
	},
	onChange: function(e) {
		this.setState({text: e.target.value})
	},
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("form", {onSubmit: this.handleSubmit}, 
					React.createElement("input", {type: "text", placeholder: "Search", onChange: this.onChange, value: this.state.text}), 
					React.createElement("button", null, "submit")
				), 
				React.createElement(Dic, {items: this.state.items})
			)
		)
	}
});

React.renderComponent(React.createElement(MainContent, null), document.getElementById('content'));

