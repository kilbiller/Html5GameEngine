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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['connect']);
};
