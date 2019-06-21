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

   'webpack-dev-server': {
       main: {
          //contentBase: 'dist',
            port: 9999,
          //keepAlive: true
        }
    },

    // uglify
    uglify: {
      my_target: {
        options: {
          beautify: true
        },
        files: [{
          src: 'app.bundle.js',
          dest: 'bin',
          cwd: 'bin',
          expand: true,
          ext: '.min.js'
        }]
      }
    },

    // cssmin
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'public/src/css',
          src: ['*.css'],
          dest: 'bin/css',
          ext: '.min.css'
        }]
      }
    },

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
        "uglify": false
      }
    },

    // remove annotated angular files
    clean: {
      files: {
        src: ['bin/app.bundle.js']
      }
    }

  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['webpack:dist', 'webpack-dev-server', 'uglify', 'modernizr:dist', 'cssmin', 'clean', 'nodemon']); 

};
