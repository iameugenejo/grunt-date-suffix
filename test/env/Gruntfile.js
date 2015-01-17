'use strict'

module.exports = function(grunt) {
  grunt.initConfig({
    filerotate: {
      test1: {
        file: "test.txt"
      },
      test2: {
        file: "test.txt",
        dest: "output"
      },
      test3: {
        file: "test.txt",
        dest: "output",
        copy: true
      }
    }
  });

  grunt.loadTasks("../../tasks");
}