module.exports = function(grunt) {

  grunt.initConfig({

    // JSHint options
    jshint: {
      options: {
        jshintrc: 'public/scripts/.jshintrc'
      },
      scripts: 'public/scripts/**/*.js',
    },

    // Watch task options
    watch: {
      files: ['<%= jshint.scripts %>'],
      tasks: ['jshint']
    }
  });

  // Task for starting the server
  grunt.registerTask('start-server',
    'Start Todo application backend server',
    function() {
      var done = this.async();
      require('./server');
    });

  // Load NPM plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register default task
  grunt.registerTask('default', ['jshint']);

};