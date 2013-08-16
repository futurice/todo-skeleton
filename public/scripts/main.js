/**
    To load text dependencies, use define like this:

    define(['jquery', 'underscore', 'text!partials/hello.html'], 
        function($, _, hello) { .. }

    To use text template:

    var helloTemplate = _.template(hello);
    var helloHtml = helloTemplate({name: "Mikko"});
    var helloElement = $(helloHtml);
    $("body").prepend(helloElement);
    
*/

requirejs.config({
    paths: {
        jquery: [
            '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
            '../bower_components/jquery/jquery' // your fallback
        ],
        underscore: '../bower_components/underscore/underscore',
        text: '../lib/text',
        partials: '../partials',
        backbone: '../bower_components/backbone/backbone'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

define([
    'jquery', 
    'underscore', 
    'collections/list', 
    'views/list', 
    'views/new-item',
    'views/footer',
    'models/list-filter'], 
        function($, _, List, ListView, NewItemView, Footer, ListFilter) {
    
    "use strict";
    
    var listFilter = new ListFilter();
    var list = new List();
    new ListView({
        collection: list,
        listFilter: listFilter
    });
    new NewItemView({
        collection: list
    });
    new Footer({
        collection: list,
        listFilter: listFilter
    });
    list.fetch();
});