requirejs.config({
    paths: {
        jquery: [
            '//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min',
            '../lib/jquery' // your fallback
        ],
        underscore: '../lib/underscore'
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