"use strict";

module.exports = function (grunt) {

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 80,
                    //open: {target: 'http://localhost'},
                    //keepalive: true // true si pas de watch
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    'build/game.js': ['src/**/*.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['browserify'],
                options: {
                    spawn: false,
                },
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['browserify', 'connect', 'watch']);
};
