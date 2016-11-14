// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({

    // configure nodemon
    nodemon: {
      dev: {
        script: 'index.js'
      }
    },

    // configure webpack
    webpack: {
      dist: {
       entry: './public/src/js/beer.js',
       output: {
           path: './bin',
           filename: 'app.bundle.js',
       },
       module: {
          loaders: [

              {
                  test: /\.js$/, 
                  exclude: /node_modules/,
                  loader: "babel-loader"
              },
              {
                  test: /\.jsx$/, 
                  exclude: /node_modules/,
                  loader: "babel-loader"
              }
          ]
       }
      }
    },

    // configure modernizr
    modernizr: {
      dist: {
        "crawl": false,
        "customTests": [],
        "dest": "./bin/modernizr.js",
        "tests": [
          "touchevents"
        ],
        "options": [
          "setClasses"
        ],
        "uglify": true
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', ['webpack:dist', 'modernizr:dist', 'nodemon']); 

};