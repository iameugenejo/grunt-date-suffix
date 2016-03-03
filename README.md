[![NPM Version](https://img.shields.io/npm/v/grunt-date-suffix.svg?style=flat)](https://www.npmjs.com/package/grunt-date-suffix)
[![NPM Downloads](https://img.shields.io/npm/dm/grunt-date-suffix.svg?style=flat)](https://npmjs.org/package/grunt-date-suffix)
[![Build Status](https://travis-ci.org/iameugenejo/grunt-date-suffix.svg?branch=master)](https://travis-ci.org/iameugenejo/grunt-date-suffix)
[![Dependency Status](https://david-dm.org/iameugenejo/grunt-date-suffix.svg)](https://david-dm.org/iameugenejo/grunt-date-suffix)
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/iameugenejo/grunt-date-suffix?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

# grunt-date-suffix
Grunt plugin for renaming a file with a date suffix.

### Install

```bash
npm install grunt-date-suffix --save-dev
```

### Grunt configuration 

```javascript
datesuffix: {
  rename1: {
    
    /**
     * Original filename (with path if not in current directory)
     * @required
     */
    file: "test.txt",
    
    /**
     * If move file to other directory, define here.
     * @optional
     */
    dest: "outputDir"
    
    /**
     * Divider between filename and date.
     * @optional
     * @default "."
     */
    divider: "-"
    
    /**
     * Switch behavior from "rename/move" to "copy".
     * @optional
     * @default false
     */
    copy: true,
    
    /**
     * Datetime format. Used node library `date-format`.
     * @optional
     * @default "yyyyMMddhhmmssSSS"
     */     
    date_format: "yyyyMMdd"
  },
}
```

### Configuration example

```javascript
//Gruntfile.js
  grunt.initConfig({
    datesuffix: {
      test1: {
        file: "test.txt",               //required
      },
      test2: {
        file: "test.txt",               //required
        dest: "outputDir",              //default: undefined
      },
      test3: {
        file: "test.txt",               //required
        dest: "output",                 //default: undefined
        copy: true,                     //default: false
        date_format: "yyyyMMdd"         //default: "yyyyMMddhhmmssSSS"
      },
      test4: {
        files: "filedoesnotexist.txt",  //required
        ignore_nonexistent: true        //default: false
      },
      test5: {
        files: "filedoesnotexist.txt",  //required
        divider: "-"                    //default: "."
      }
    }
  });

  grunt.loadNpmTasks("grunt-date-suffix");
```

### Use

```bash
grunt datesuffix:test1
grunt datesuffix:test2
grunt datesuffix:test3
grunt datesuffix:test4
grunt datesuffix:test5
```

####Result
```bash
# test1
  test.20150116201020123.txt
  
# test2
  output/test.20150116201020123.txt
  
# test3
  test.txt
  output/test.20150116.txt
  
# test4
# no error is thrown even if the file does not exist

# test5
  test-20150116201020123.txt
```
