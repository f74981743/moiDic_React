/** @jsx React.DOM */

var Quote = React.createClass({displayName: "Quote",
	render: function() {
		//console.log(this.props.quote);
		var quote = this.props.quote.map(function(quote) {
			return (
				React.createElement("li", null, 
					quote
				)
			)
		});

		return (
			React.createElement("ul", null, 
				quote
			)
		)
	}
});

var Def = React.createClass({displayName: "Def", 
	render: function() {
		//console.log(this.props.items.def);
		var def = this.props.items.def.map(function(item, index) {
			console.log(item.quote);
				return (
					React.createElement("li", null, 
						item.def, 
						React.createElement(Quote, {quote: item.quote[index]})
					)
				)

		});
		return (
			React.createElement("ol", null, 
				def
			)
		)
	}
});

var DefObj = React.createClass({displayName: "DefObj",
	render: function() {
		return (
			React.createElement(Def, {items: this.props.items})
		)
	}
});

var Definition = React.createClass({displayName: "Definition",
	render: function() {

		var type = [],
			defObjAry = [],
			defObj = {
				type: '',
				def: [],
				quote: []
			},
			count = this.props.items.length;
		for (var i = 0; i < count; i ++) {

			if ((jQuery.inArray(this.props.items[i].type, type)) == -1) {

				type.push(this.props.items[i].type);

			}

		}
		
		for(var i = 0; i < type.length; i ++) {
			defObj = {
				type: '',
				def: [],
			};
			for(var j = 0; j < count; j ++) {
				if(type[i] == this.props.items[j].type) {
					var a = {
						def: '',
						quote: []
					}

					a.def = this.props.items[j].def;
					a.quote.push(this.props.items[j].quote);
					defObj.type = type[i];

					defObj.def.push(a);
					//type.push(this.props.items[j]);
				}
			}
			defObjAry.push(defObj);
		}

		//console.log(defObjAry);
		var def = defObjAry.map(function(def) {
			return (
				React.createElement("div", null, 
					React.createElement("h2", null, def.type), 
					React.createElement(DefObj, {items: def})
				)
			)
		});
		
		return (
			React.createElement("div", null, 
				def
			)
		)
	}
});

var Dic = React.createClass({displayName: "Dic",
	render: function() {
		var rns = '';
		if(this.props.items.radical != undefined) {
			rns = this.props.items.radical + ' + ' + this.props.items.non_radical_stroke_count + ' = ' + this.props.items.stroke_count;
		
			return (
				React.createElement("div", null, 

					React.createElement("div", null, 
						this.props.items.title
					), 
					React.createElement("div", null, 
						rns 
					), 
					React.createElement("div", null, 
						this.props.items.heteronyms[0].bopomofo
					), 
					React.createElement("div", null, 
						this.props.items.heteronyms[0].bopomofo2
					), 
					React.createElement(Definition, {items: this.props.items.heteronyms[0].definitions})

				)
			)
		} else {
			return (
				React.createElement("div", null)
			)
		}
	}
});

var MainContent = React.createClass({displayName: "MainContent",

	getInitialState: function() {
		return {
			items: {},
			text: ''
		}
	},
	handleSubmit: function(e) {
		e.preventDefault();
		$.ajax({
		  url: "https://www.moedict.tw/uni/" + this.state.text,
		  dataType: "json",
		  success: function(result) {
		    this.setState({items: result});
		  }.bind(this)
		});
	},
	onChange: function(e) {
		this.setState({text: e.target.value});
	},
	render: function() {
		return (
			React.createElement("div", {id: "mainContent"}, 
				React.createElement("form", {onSubmit: this.handleSubmit}, 
					React.createElement("input", {type: "text", placeholder: "search", onChange: this.onChange, value: this.state.text}), 
					React.createElement("button", null, "Search")
				), 
				React.createElement(Dic, {items: this.state.items})
			)
		)
	}
});

React.renderComponent(React.createElement(MainContent, null), document.getElementById('content'));