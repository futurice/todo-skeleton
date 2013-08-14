define(['jquery', 'backbone'], function($, Backbone) {
	
	// Define Todo model
	var Item = Backbone.Model.extend({
		urlRoot: "/api/todos"
	});

	// Define List collection
	var List = Backbone.Collection.extend({
		model: Item,
		url: "/api/todos"
	});

	// Instantiate list and fetch from server
	// Fetch triggers "sync" event
	var list = new List();
	list.fetch();

	// Example of events
	list.on("sync", function(collection) {
		debugger;
		console.log("Collection successfully synced.")
		console.log(collection.models.length, "items loaded from server");
		collection.forEach(function(model) {
			console.log(model);
		})
	});

	// Create new item and save it
	var item = new Item({
		title: "Get a job",
		done: false
	});

	// Add it to collection and save it to server
	list.add(item);
	item.save();

	debugger;
	item.on("sync", function(model) {
		debugger;
		console.log("Item successfully saved to server");
		console.log(model);

		console.log("Log all items");
		list.forEach(console.log.bind(console));
	});

	// Initialize list view container element
	var ListView = Backbone.View.extend({

		tagName: "div",
		className: "list-container",

		events: {
			"click .del": "delete"
		},

		initialize: function() {
			this.collection.bind("sync", this.render, this);
		},

		"delete": function() {
			debugger;
			console.log("Now, delete me");
		},

		render: function() {
			debugger;
			// Instantiate SubView
			// Add subview to ListView
			// Render SubView
		}
	});

	var listView = new ListView({
		collection: list
	});

});