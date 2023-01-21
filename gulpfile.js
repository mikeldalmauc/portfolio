const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const sharpResponsive = require("gulp-sharp-responsive");
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const replace = require('gulp-replace');
const cssnano = require('cssnano');
const fs = require('fs')

const cssVersion = new Date().getTime();
const sassFiles = 'src/sass/**/*.sass';
const jsFiles = 'src/js/**/*.js';
const htmlFiles = 'src/html/**/*.html';
const imageFiles = 'src/data/gallery/*.jpg';
const processedImages = 'assets/**';
const galleryConfig = JSON.parse(fs.readFileSync('src/data/galleryImages.json')).data;


// fetch command line arguments
const arg = (argList => {

    let arg = {}, a, opt, thisOpt, curOpt;
    for (a = 0; a < argList.length; a++) {

      thisOpt = argList[a].trim();
      opt = thisOpt.replace(/^\-+/, '');
  
      if (opt === thisOpt) {
  
        // argument value
        if (curOpt) arg[curOpt] = opt;
        curOpt = null;
      }
      else {
  
        // argument name
        curOpt = opt;
        arg[curOpt] = true;
      }
    }
    return arg;
  })(process.argv);


function imageOptimizerTask(){

    const BREAKPOINTS = galleryConfig.breakpoints; 

    const onDiv = div => BREAKPOINTS.map(bp => [Math.round((bp.size*16) / div), "-"+bp.name]);
    const div = arg.d || 1;
    const bps = onDiv(div); 
    // creates an array of [[1, "-xs"], [2, "-sm"], ... ] (obviously the values are 576/div etc)

    let formatOptions = {quality: galleryConfig.quality};
    
    return src(imageFiles)
        .pipe(rename(function (path) {
            path.dirname += "/" + path.basename;
        }))
        .pipe(sharpResponsive({
            formats: galleryConfig.formats.map(format => {
                if("jpg" === format)
                    formatOptions = {quality: galleryConfig.quality, progressive:true};
                else
                    formatOptions = {quality: galleryConfig.quality};

                return bps.map(([width, suffix]) => ({ width, format: format, rename: { suffix }, formatOptions}));
            }
            ).flatMap(f => f)
        }))
        .pipe(dest('assets/gallery'));
}


browserSync.init({
    server: {
        baseDir: "./",
    }
});

function scssTask() {
    return src(sassFiles)
        .pipe(sourcemaps.init()) // Lets us see the CSS source code in the inspector
        .pipe(sass()) // Transpiles SCSS to CSS
        .pipe(postcss([autoprefixer(), cssnano()])) // Add browser prefixes and minify  
        .pipe(sourcemaps.write('.')) // Create sourcemap in the same place as the CSS
        .pipe(dest('build')) // Put everything in the build directory
        .pipe(browserSync.stream());
}

function jsTask() {
    return src(jsFiles)
        .pipe(concat('index.js')) // Combine all JS files together into index.js
        .pipe(uglify()) // Obfuscate the code
        .pipe(dest('build')) // Put everything in the build directory
        .pipe(browserSync.stream()); // Update the browser
}

// Gulp task to copy HTML files to output directory
function htmlTask(){
    return src(htmlFiles)
    .pipe(dest('build')) // Put everything in the build directory
    .pipe(browserSync.stream());
}

function preventCachingTask() {
    // Looks in the index.html file for any files that have a 'v=' tag,
    // and updates the version number to prevent browsers from caching
    // old versions of the file. 
    return src(['index.html'])
        .pipe(replace(/v=\d+/g, 'v=' + cssVersion))
        .pipe(dest('.'));
}

function watchTask() {
    // Watch for changes in any SCSS or JS files, and run the scssTask,
    // jsTask, and preventCachingTask functions whenever there is a change.
    watch(
        [sassFiles, jsFiles, htmlFiles],
        series(
            parallel(scssTask, jsTask),
            preventCachingTask
        )
    );
}

// Export everything to run when you run 'gulp'
module.exports = {
    imageOptimizerTask,
    default: series(
        parallel(scssTask, jsTask, htmlTask),
        preventCachingTask,
        watchTask
    )
  };