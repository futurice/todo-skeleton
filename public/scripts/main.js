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
            '//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min',
            '../lib/jquery' // your fallback
        ],
        underscore: '../lib/underscore',
        text: '../lib/text',
        partials: '../partials'
    },
    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

define(['jquery', 'underscore'], function($, _) {
    "use strict";
    console.log("This is required file");

    if($) {
        console.log("jQuery is loaded!");
    }

    if(_) {
        console.log("Underscore is defined");
    }
});