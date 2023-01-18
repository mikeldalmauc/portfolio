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

Install sass dependency

`npm install --save-dev sass`         

Adding postcss as a depency might be necessary

`npm i postcss`

## Build

Simply run the next command which should run the default task

`gulp`

### Image processing
Install sharp if image management is intended.

`npm install --save-dev gulp gulp-sharp-responsive`

`npm install gulp-rename`

To process images use:

` gulp imageOptimizerTast` or   `gulp imageOptimizerTast -d 4` where the image generated would be a 1/4 of a fullscreen image.    

### Serving images with express server


##### Boilerplate adapted from
https://www.devsamples.com/javascript/example-gulpfile-scss-js-reload