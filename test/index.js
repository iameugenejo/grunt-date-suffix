'use strict'

var should = require("should");
var fs = require("fs-extra");
var Path = require("path");
var grunt = require("grunt");
var testFilePrefix = "test";
var testFileExtname = ".txt";
var testFileName = testFilePrefix+testFileExtname;
var testOutputPath = "./test/env/output";
var rotatedFilePattern = new RegExp("^test[.][0-9]{1,}[.]txt$");
var sandboxPath = "./test/env";

function createTestFile(done) {
  fs.writeFile(Path.join(sandboxPath, "test.txt"), "testing..", done);
}

function findMatch(pattern, path, done) {
  fs.readdir(path, function(err, files) {
    if(err) return done(err);

    for(var i = 0, ic = files.length;i<ic;i++) {
      var f = files[i];

      if(pattern.test(f)) return done(null, f);
    }

    done();
  });
}

describe("grunt-file-rotate test", function() {
  it("prepares test", function(done) {
    createTestFile(done);
  });

  it("rotates to the same directory", function(done) {
    grunt.util.spawn({
      cmd: "grunt",
      args: ["filerotate:test1"],
      opts: {
        cwd: sandboxPath
      }
    }, function(err, out) {
      if(err) {
        grunt.fail.fatal(out.stdout);
        return done(err);
      }

      fs.exists(Path.join(sandboxPath, testFileName), function(exist) {
        try {
          exist.should.not.be.ok;

          findMatch(rotatedFilePattern, sandboxPath, function(err, name) {
            if(err) return done(err);
            try {
              should.exist(name);

              fs.unlink(Path.join(sandboxPath, name), done);
            } catch(err) {
              done(err);
            }
          });
        } catch(err) {
          done(err);
        }
      });
    });
  });

  it("prepares next test", function(done) {
    createTestFile(done);
  });

  it("rotates to a different directory", function(done) {
    grunt.util.spawn({
      cmd: "grunt",
      args: ["filerotate:test2"],
      opts: {
        cwd: sandboxPath
      }
    }, function(err) {
      if(err) {
        grunt.fail.fatal(out.stdout);
        return done(err);
      }

      fs.exists(Path.join(sandboxPath, testFileName), function(exist) {
        try {
          exist.should.not.be.ok;

          findMatch(rotatedFilePattern, testOutputPath, function(err, name) {
            if(err) return done(err);
            try {
              should.exist(name);

              fs.unlink(Path.join(testOutputPath, name), done);
            } catch(err) {
              done(err);
            }
          });
        } catch(err) {
          done(err);
        }
      });
    });
  });


  it("prepares next test", function(done) {
    createTestFile(done);
  });

  it("rotates to a different directory and leave the original copy", function(done) {
    grunt.util.spawn({
      cmd: "grunt",
      args: ["filerotate:test3"],
      opts: {
        cwd: sandboxPath
      }
    }, function(err) {
      if(err) {
        grunt.fail.fatal(out.stdout);
        return done(err);
      }
      
      fs.exists(Path.join(sandboxPath, testFileName), function(exist) {
        try {
          exist.should.be.ok;

          findMatch(rotatedFilePattern, testOutputPath, function(err, name) {
            if(err) return done(err);
            try {
              should.exist(name);

              fs.unlink(Path.join(testOutputPath, name), done);
            } catch(err) {
              done(err);
            }
          });
        } catch(err) {
          done(err);
        }
      });
    });
  });

  it("cleans up", function(done) {
    fs.unlink(Path.join(sandboxPath, testFileName), function(err) {
      if(err) return done(err);
      
      fs.remove(testOutputPath, done);
    });
  });
});