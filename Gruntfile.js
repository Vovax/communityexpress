var webpackDevConfig = require('./webpack.config.js');

module.exports = function (grunt) {
    'use strict';

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    var webpack = require('webpack');

    var yeomanConfig = {
        app: 'app',
        dist: 'dist',
        indexFile: 'prod-index.html'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,

        webpack: {
            options: webpackDevConfig,
            build: {
            }
        },
        clean: ['<%= yeoman.dist %>'],
        uglify: {
            options: {
                compress: true,
                mangle: true
            },
            target: {
                src: '<%= yeoman.dist %>/build/bundle.js',
                dest: '<%= yeoman.dist %>/build/bundle.js'
            }
        },
        cssmin: {
            target: {
                files: {
                    '<%= yeoman.dist %>/build/styles.css': '<%= yeoman.dist %>/build/styles.css'
                }
            },
            options: {
                report: 'min'
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: [
                            '*.{ico,txt,png}',
                            '.htaccess',
                        ],
                        dest: '<%= yeoman.dist %>'
                    },
                    {
						expand: true,
						cwd: 'no_sitelette',
						src: '{,*/}*',
						dest: '<%= yeoman.dist %>/no_sitelette'
                    },
                    {
                        expand: true,
                        cwd: 'd',
                        src: '{,*/}*',
                        dest: '<%= yeoman.dist %>/d'
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/build',
                        src: '{,*/}*',
                        dest: '<%= yeoman.dist %>/build'
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/styles/icons',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: '<%= yeoman.dist %>/styles/icons/'
                    },
                    {
                        src: '<%= yeoman.app %>/index.php',
                        dest: '<%= yeoman.dist %>/index.php'
                    },
                    {
                        src: '<%= yeoman.app %>/parser_api_utility.php',
                        dest: '<%= yeoman.dist %>/parser_api_utility.php'
                    },
                    {
						src: '<%= yeoman.app %>/sitelette.php',
						dest: '<%= yeoman.dist %>/sitelette.php'
                    }
                ]
            }
        }
    });
    grunt.registerTask('default', ['webpack:build']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'uglify',
        'cssmin'
    ]);
};