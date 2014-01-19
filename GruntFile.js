/*global module*/
module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 80,
                    keepalive: true,
                    open: {target: 'http://localhost'}
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "js",
                    include: ['lib/require', 'main'],
                    out: "./optimized.js"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-requirejs');

    grunt.registerTask('default', ['connect']);
    grunt.registerTask('optimize', ['requirejs']);
};
