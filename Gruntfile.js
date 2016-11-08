// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({

    // jade: {
    //   compile: {
    //     options: {
    //       data: {
    //         debug: false
    //       }
    //     },
    //     files: {
    //       'public/views/home.html' : 'public/views/home.jade'
    //     }
    //   }
    // },

    // configure nodemon
    nodemon: {
      dev: {
        script: 'index.js'
      }
    }

  });

  // load nodemon
  grunt.loadNpmTasks('grunt-nodemon');
  // grunt.loadNpmTasks('grunt-contrib-jade')

  // register the nodemon task when we run grunt
  // grunt.registerTask('default', ['nodemon', 'jade']); 
  grunt.registerTask('default', ['nodemon']); 

};