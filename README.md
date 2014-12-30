![Burp](logo.png)

> A modern and as fast as a burp front-end template

[![NPM version](https://badge.fury.io/js/gulp.svg)](http://badge.fury.io/js/gulp) [![Bower version](https://badge.fury.io/bo/mantis-js.svg)](http://badge.fury.io/bo/mantis-js)

---


Get started
-----------

First of all, you need have installed [Node.js](http://nodejs.org/) and [Gulp](http://gulpjs.com) globally.
Then you can:

- Clone the repo: `git clone git@github.com:acauamontiel/burp.git`
- Enter the folder: `cd burp`
- Install Node dependencies: `npm install`
- Finally install Bower components: `bower install`


Running
-------

You can run the app locally by [Gulp](http://gulpjs.com)

### Available Gulp commands

#### Default - `gulp`

Run `gulp` to compile and watch Jade, Stylus, JavaScript and optimize images running on [localhost:3002](http://localhost:3000)


#### Build - `gulp build`

Run `gulp build` to only compile Jade, Stylus, JavaScript and optimize images  files


#### Dist - `gulp dist`

Run `gulp build` to compile and minify Jade, Stylus, JavaScript and optimize images


Structure
---------

When you have all installed, the structure will look something like this:

```
node_modules/
src/
├── dependencies/
├── css/
│   ├── components/
│   │   └── *.styl
│   ├── core/
│   │   └── *.styl
│   ├── equalizr.styl
│   └── style.styl
├── fonts/
│   └── *.{eot|svg|ttf|woff}
├── html/
│   ├── incs/
│   │   └── *.jade
│   ├── layouts/
│   │   └── *.jade
│   └── index.jade
├── img/
│   ├── backgrounds/
│   │   └── *.{jpg|png|svg}
│   ├── favicons/
│   │   └── *.{png}
│   ├── icons/
│   │   └── *.{jpg|png|svg}
│   └── *.{jpg|png|svg}
├── js/
│   ├── modules/
│   │   └── *.js
│   └── app.js
├── .htaccess
├── browserconfig.xml
├── favicon.ico
└── humans.txt
.bowerrc
.editorconfig
.gitattributes
.gitignore
.jshintrc
bower.json
gulpfile.js
logo.png
package.json
README.md
```


License
-------

© 2014 - 2015 [Acauã Montiel](http://acauamontiel.com.br)

[MIT License](http://acaua.mit-license.org/)
