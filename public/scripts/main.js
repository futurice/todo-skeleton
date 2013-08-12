requirejs.config({
    paths: {
        jquery: [
            '//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min',
            '../lib/jquery' // your fallback
        ],
    },
});

define(['jquery'], function($) {
    "use strict";
    console.log("This is required file");

    if($) {
        console.log("jQuery is loaded!");
    }
});