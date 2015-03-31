/** @jsx React.DOM */

var Quote = React.createClass({displayName: "Quote",
	render: function() {
		if(this.props.quote != undefined) {
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
		} else {
			return (
				React.createElement("div", null
				)
			)
		}
	}
});

var Example = React.createClass({displayName: "Example",
	render: function() {

		if(this.props.example != undefined) {
			var example = this.props.example.map(function(example) {
				return (
					React.createElement("li", null, 
						example
					)
				)
			});

			return (
				React.createElement("ul", null, 
					example
				)
			)
		} else {
			return (
				React.createElement("div", null
				)
			)
		}
	}
});

var Link = React.createClass({displayName: "Link",
	render: function() {

		if(this.props.link != undefined) {
			var link = this.props.link.map(function(link) {
				return (
					React.createElement("li", null, 
						link
					)
				)
			});

			return (
				React.createElement("ul", null, 
					link
				)
			)
		} else {
			return (
				React.createElement("div", null
				)
			)
		}
	}
});

var Def = React.createClass({displayName: "Def", 
	render: function() {
	
		var def = this.props.items.def.map(function(item, index) {
			
					return (
						React.createElement("li", null, 
							item.def, 
							React.createElement(Quote, {quote: item.quote}), 
							React.createElement(Example, {example: item.example}), 
							React.createElement(Link, {link: item.link})
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

var PhaseDefinition = React.createClass({displayName: "PhaseDefinition",

	


	render: function() {
		return (
			React.createElement("ol", null, 
				React.createElement("li", null, 
				"fe"
				)
			)
		)
	}
});

var Definition = React.createClass({displayName: "Definition",
	render: function() {

		var type = [],
			defObjAry = [],
			defObj = {
				type: '',
				def: []
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
					var a = {};
					a.def = this.props.items[j].def;
					a.quote = this.props.items[j].quote;
					a.link = this.props.items[j].link;
					a.example = this.props.items[j].example;
					defObj.type = type[i];
					defObj.def.push(a);
				}
			}
			defObjAry.push(defObj);
		}

		var def = defObjAry.map(function(def) {
			return (
				React.createElement("div", null, 
					React.createElement("div", {className: "type"}, def.type), 
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

var Heteronyms = React.createClass({displayName: "Heteronyms",
	render: function() {
		var heteronyms = this.props.heters.map(function(heter) {
			return (
				React.createElement("div", null, 

					React.createElement("div", {className: "word"}, 
						React.createElement("div", {className: "title"}, 
							heter.title
						), 

						React.createElement("div", {className: "bopomofo"}, 
							heter.bopomofo
						), 

						React.createElement("div", {class: "bopomofo2"}, 
							heter.bopomofo2
						)
					), 

					React.createElement("div", {className: "rns"}, 
						heter.rns
					), 

					React.createElement(Definition, {items: heter.definitions})

				)
			)
		});

		return (
			React.createElement("div", null, 
				heteronyms
			)
		)
	}
});

var Dic = React.createClass({displayName: "Dic",
	render: function() {
		var rns = '';
		if(this.props.items.radical != undefined && this.props.items.title.length == 1) {
			rns = this.props.items.radical + ' + ' + this.props.items.non_radical_stroke_count + ' = ' + this.props.items.stroke_count;

			for(var i = 0; i < this.props.items.heteronyms.length; i ++) {
				this.props.items.heteronyms[i].title = this.props.items.title;
				this.props.items.heteronyms[i].rns = rns;
			}

			return (
				React.createElement("div", null, 

					React.createElement(Heteronyms, {heters: this.props.items.heteronyms})
					
				)
			)
		} else if (this.props.items.title != undefined && this.props.items.title.length > 1) {
			return (
				React.createElement("div", null, 
					React.createElement("div", null, 
						this.props.items.title
					), 

					React.createElement("div", null, 
						this.props.items.heteronyms[0].bopomofo
					), 

					React.createElement("div", null, 
						this.props.items.heteronyms[0].bopomofo2
					), 
			
					React.createElement(PhaseDefinition, {items: this.props.items.heteronyms[0].definitions})
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
		    this.setState({items: result});console.log(result);
		  }.bind(this),
		  failure: function(err) {
		  	console.log(err);
		  }.bind(this),
		  error:function (xhr, ajaxOptions, thrownError){
	        console.log(xhr.status);
	        console.log(xhr.statusText);
	        console.log(xhr.responseText);
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