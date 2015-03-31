/** @jsx React.DOM */

var Quote = React.createClass({
	render: function() {
		if(this.props.quote != undefined) {
			var quote = this.props.quote.map(function(quote) {
				return (
					<li>
						{quote}
					</li>
				)
			});

			return (
				<ul>
					{quote}
				</ul>
			)
		} else {
			return (
				<div>
				</div>
			)
		}
	}
});

var Example = React.createClass({
	render: function() {

		if(this.props.example != undefined) {
			var example = this.props.example.map(function(example) {
				return (
					<li>
						{example}
					</li>
				)
			});

			return (
				<ul>
					{example}
				</ul>
			)
		} else {
			return (
				<div>
				</div>
			)
		}
	}
});

var Link = React.createClass({
	render: function() {

		if(this.props.link != undefined) {
			var link = this.props.link.map(function(link) {
				return (
					<li>
						{link}
					</li>
				)
			});

			return (
				<ul>
					{link}
				</ul>
			)
		} else {
			return (
				<div>
				</div>
			)
		}
	}
});

var Def = React.createClass({ 
	render: function() {
	
		var def = this.props.items.def.map(function(item, index) {
			
					return (
						<li>
							{item.def}
							<Quote quote = {item.quote} />
							<Example example = {item.example} />
							<Link link = {item.link} />
						</li>
					)
		});
		return (
			<ol>
				{def}
			</ol>
		)
	}
});

var DefObj = React.createClass({
	render: function() {
		return (
			<Def items = {this.props.items}/>
		)
	}
});

var PhaseDefinition = React.createClass({
	render: function() {

		var def = this.props.items.map(function(def) {
			return (
				<li>
					{def.def}
				</li>
			)
		});


		return (
			<ol>
				{def}
			</ol>
		)
	}
});

var Definition = React.createClass({
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
				<div>
					<div className = 'type'>{def.type}</div>
					<DefObj items = {def} />
				</div>
			)
		});
		
		return (
			<div>
				{def}
			</div>
		)
	}
});

var Heteronyms = React.createClass({
	render: function() {
		var heteronyms = this.props.heters.map(function(heter) {
			return (
				<div>

					<div className = 'word'>
						<div className = 'title'>
							{heter.title}
						</div>

						<div className = 'bopomofo'>
							{heter.bopomofo}
						</div>

						<div class = 'bopomofo2'>
							{heter.bopomofo2}
						</div>
					</div>

					<div className = 'rns'>
						{heter.rns}
					</div>

					<Definition items = {heter.definitions} />

				</div>
			)
		});

		return (
			<div>
				{heteronyms}
			</div>
		)
	}
});

var Dic = React.createClass({
	render: function() {
		var rns = '';
		if(this.props.items.radical != undefined && this.props.items.title.length == 1) {
			rns = this.props.items.radical + ' + ' + this.props.items.non_radical_stroke_count + ' = ' + this.props.items.stroke_count;

			for(var i = 0; i < this.props.items.heteronyms.length; i ++) {
				this.props.items.heteronyms[i].title = this.props.items.title;
				this.props.items.heteronyms[i].rns = rns;
			}

			return (
				<div>

					<Heteronyms heters = {this.props.items.heteronyms}/>
					
				</div>
			)
		} else if (this.props.items.title != undefined && this.props.items.title.length > 1) {
			return (
				<div>
					<div>
						{this.props.items.title}
					</div>

					<div>
						{this.props.items.heteronyms[0].bopomofo}
					</div>

					<div>
						{this.props.items.heteronyms[0].bopomofo2}
					</div>
			
					<PhaseDefinition items = {this.props.items.heteronyms[0].definitions} />
				</div>
			)
		} else {
			return (
				<div></div>
			)
		}
	}
});

var MainContent = React.createClass({

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
			<div id = "mainContent">
				<form onSubmit = {this.handleSubmit}>
					<input type = "text" placeholder = "search" onChange = {this.onChange} value = {this.state.text}/>
					<button>Search</button>
				</form>
				<Dic items = {this.state.items} />
			</div>
		)
	}
});

React.renderComponent(<MainContent />, document.getElementById('content'));