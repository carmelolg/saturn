'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  //Load grunt plugins
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/app/**/{,*/}*.js', '<%= yeoman.app %>/assets/js/**/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/assets/less/{,*/}*.less'],
        tasks: ['compass:server', 'autoprefixer']
      },
      less: {
       files: ['<%= yeoman.app %>/assets/less/**/{,*/}*.less'],
       tasks: ['less', 'copy:assets/css'],
       options: {
         nospawn: true,
         livereload: '<%= connect.options.livereload %>'
       }
      },
      saturnService: {
        files: ['./common/models/{,*/}*.{js,json}'],
        tasks: ['loopback_sdk_angular']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/app/**/{,*/}*.html',
          '.tmp/assets/css/{,*/}*.css',
          '<%= yeoman.app %>/assets/img/**/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '.rebooted'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 35729
      },
      //livereload: {
      //  options: {
      //    open: true,
      //    middleware: function (connect) {
      //      return [
      //        connect.static('.tmp'),
      //        connect().use(
      //          '/bower_components',
      //          connect.static('./bower_components')
      //        ),
      //        connect.static(appConfig.app)
      //      ];
      //    }
      //  }
      //},
      test: {
        options: {
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    nodemon: {
      dev: {
        script: './server/server.js',
        options: {
          env: {
            HOST: '0.0.0.0',
            PORT: 9000,
            LIVE_RELOAD: 35729,
            NODE_ENV: 'development'
          },
          ignore: ['node_modules/**', 'bower_components/**', 'server/dev-assets/memoryDB.json'],
          ext: 'js, json, coffee',
          watch: ['server', 'common'],
          delay: 0,
          legacyWatch: false,
          callback: function(nodemon) {

            nodemon.on('log', function(event) {
              console.log(event.colour);
            });

            nodemon.on('error', function(e) {
              console.log(e);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function() {
              var connectConfig = grunt.config.get().connect.options;
              // Delay before server listens on port
              setTimeout(function() {
                require('open')('http://localhost:' + connectConfig.port);
              }, 2000);
            });

            // refreshes browser when server reboots
            nodemon.on('restart', function() {
              // Delay before server listens on port
              setTimeout(function() {
                fs.writeFileSync('.rebooted', 'rebooted');
              }, 2000);
            });
          }
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        ignores: ['<%= yeoman.app %>/app/shared/services/saturnServices.js']
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/assets/css/',
          src: '{,*/}*.css',
          dest: '.tmp/assets/css/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        exclude: [
          '/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js'
        ],
        ignorePath: /\.\.\//
      },
      less:{
        src: ['<%= yeoman.app %>/assets/less/{,*/}*.{less}'],
        // ignorePath: /(\.\.\/){1,2}bower_components\//
      }
      // sass: {
      //   src: ['<%= yeoman.app %>/assets/css/{,*/}*.{scss,sass}'],
      //   ignorePath: /(\.\.\/){1,2}bower_components\//
      // }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        // sassDir: '<%= yeoman.app %>/assets/css',
        cssDir: '.tmp/assets/css',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/assets/img',
        javascriptsDir: '<%= yeoman.app %>/assets/js',
        fontsDir: '<%= yeoman.app %>/assets/fonts',
        importPath: './bower_components',
        httpImagesPath: '/img',
        httpGeneratedImagesPath: '/img/generated',
        httpFontsPath: '/css/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/img/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Compile less to css
    less: {
     server: {
       options: {
         compress: true,
         optimization: 2
       },
       files: {
         '<%= yeoman.app %>/assets/css/app.css': '<%= yeoman.app %>/assets/less/app.less'
       }
     }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/app/{,*/}*.js',
          '<%= yeoman.dist %>/assets/css/{,*/}*.css',
          '<%= yeoman.dist %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/assets/css/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/assets/css/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/assets/img']
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/assets/css/main.css': [
    //         '.tmp/assets/css/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/assets/img',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/assets/img'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/assets/img',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/assets/img'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'app/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: ['*.js', '!oldieshim.js'],
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'app/{,*/}*.html',
            'assets/img/{,*/}*.{webp}',
            'assets/css/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/assets/img',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= yeoman.dist %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/assets/css',
        dest: '.tmp/assets/css/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      },
      server: [
        'compass:server',
        //'less:server'
      ],
      test: [
        'compass',
        //'less'
      ],
      dist: [
        'compass:dist',
        //'less:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        options: {
          singleRun: true,
          configFile: 'test/karma.conf.js',
        }
      },
    },

    protractor: {
      options: {
        configFile: 'node_modules/protractor/example/conf.js', // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      e2e: { // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
        options: {
          configFile: 'test/protractor.conf.js', // Target-specific config file
          args: {} // Target-specific arguments
        }
      },
    },

    // Loopback sdk angular settings
    loopback_sdk_angular: { // jshint ignore:line
      services: {
        options: {
          input: './server/server.js',
          output: '<%= yeoman.app %>/app/shared/services/saturnServices.js',
          ngModuleName: 'saturnServices'
        }
      }
    },

    //Documentation
    docular: {
      groups: [{
        groupTitle: 'LoopBack',
        groupId: 'loopback',
        sections: [{
          id: 'SaturnServices',
          title: 'Saturn Services',
          scripts: ['<%= yeoman.app %>/app/shared/services/saturnServices.js']
        }]
      }]
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      // 'less',
      'concurrent:server',
      'autoprefixer',
      'loopback_sdk_angular',
      'concurrent:dev'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    // 'jshint',
    'karma',
    'protractor:e2e'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
