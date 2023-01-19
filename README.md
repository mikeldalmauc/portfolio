# Personal portfolio
Personal portfolio website


## Installation

### Requirements

Node js

### Steps 

Create package.json file with helper tool, only if clean project is being created.

`npm init`

Install gulp client

`npm install -g gulp-cli`    

Install all gulp dependencies

`npm install -d gulp browser-sync gulp-sass gulp-sourcemaps gulp-concat gulp-uglify gulp-postcss autoprefixer gulp-replace cssnano `

Proceed to image generation and build.

## Build

Simply run the next command which should run the default task

`gulp`

### Image processing

To process images use:

` gulp imageOptimizerTask` or   `gulp imageOptimizerTask -d 4` where the image generated would be a 1/4 of a fullscreen image.    

##### Notes:

Install sharp for imaga management is may be required.

`npm install --save-dev gulp gulp-sharp-responsive`

Install sass gulp-rename may be necessary:

`npm install gulp-rename`

Install sass dependency may be necessary:

`npm install --save-dev sass`         

Adding postcss as a depency might be necessary

`npm i postcss`

##### Boilerplate adapted from
https://www.devsamples.com/javascript/example-gulpfile-scss-js-reload