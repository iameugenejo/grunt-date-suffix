'use strict'

var Path = require("path");
var fs = require("fs-extra");
var df = require("date-format");

module.exports = function(grunt) {
  grunt.registerMultiTask("datesuffix", "Rotate a file.", function() {
    var options = this.data;

    var done = this.async();
    
    var file = options.file;
    var filename = Path.basename(file);
    var extname = Path.extname(filename);
    var ignoreNonExistent = options.ignore_nonexistent;
    var copy = options.copy;
    var dest = options.dest||Path.dirname(file);
    
    var dateSuffixFormat = options.date_format||"yyyyMMddhhmmssSSS";

    if(!file) return done(new Error("--file is required."));

    fs.exists(file, function(exist) {
      if(!exist) {
        if(ignoreNonExistent)
          return done();
        else
          return done(new Error("file does not exist."));
      }

      fs.ensureDir(dest, function(err) {
        if(err) return done(err);


        fs.readdir(dest, function(err, files) {
          if(err) return done(err);

          var newFile = Path.join(dest, filename.substring(0, filename.length-extname.length) + "." + df.asString(dateSuffixFormat, new Date()) + extname);
          var handler = copy ? fs.copy : fs.rename;

          handler(file, newFile, done);
        });//end of readdir(dest)

      });//end of ensureDir(dest)

    });//end of exists(file)
  });//end of registerMultiTask("filerotate")
};