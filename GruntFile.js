"use strict";

module.exports = function (grunt) {

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 80,
                    //open: {target: 'http://localhost'},
                    keepalive: true
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    'game.js': ['js/**/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['browserify', 'connect']);
};
