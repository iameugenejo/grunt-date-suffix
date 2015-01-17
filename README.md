# grunt-date-suffix

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/iameugenejo/grunt-date-suffix?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Grunt plugin for renaming a file with a date suffix.

### Install

```bash
npm install grunt-date-suffix --save-dev
```

### Configure

```javascript
//Gruntfile.js
  grunt.initConfig({
    datesuffix: {
      test1: {
        file: "test.txt",       //required
      },
      test2: {
        file: "test.txt",       //required
        dest: "output",         //default: undefined
      },
      test3: {
        file: "test.txt",       //required
        dest: "output",         //default: undefined
        copy: true,             //default: false
        date_format: "yyyyMMdd" //default: "yyyyMMddhhmmssSSS"
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
```
