module.exports = function(grunt) {

  grunt.initConfig({

    // Directories
    dirs: {
      public: 'public/',
      scripts: '<%= dirs.public %>/scripts/',
      styles: '<%= dirs.public %>/sass',
    },

    // JSHint options
    jshint: {
      options: {
        jshintrc: 'public/scripts/.jshintrc'
      },
      scripts: '<%= dirs.public %>/scripts/**/*.js',
    },

    // Compass options
    compass: {
      dist: {
        options: {
          basePath: '<%= dirs.public %>'
        }
      }
    },

    // Watch task options
    watch: {
      scripts: {
        files: ['<%= dirs.public %>/scripts/**/*.js'],
        tasks: ['jshint']
      },
      styles: {
        files: ['<%= dirs.styles %>' + '/**/*.scss'],
        tasks: ['compass'],
        options: {
          livereload: true
        }
      }
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
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Register default task
  grunt.registerTask('default', ['jshint', 'compass']);

};