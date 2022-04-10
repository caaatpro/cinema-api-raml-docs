const {
  series, watch,
} = require('gulp')
const browserSync = require('browser-sync').create()
const exec = require('child_process').exec;

const paths = {
  raml: {
    src: ['./docs/**/*', '!./docs/**/*.html'],
    dest: './docs'
  }
}

function browserLive(done) {
  browserSync.init({
    server: {
      baseDir: './docs',
    },
    port: 3000,
    notify: false
  })
  done()
}

function watchRaml() {
  return watch(paths.raml.src).on('change', series(ramlBuild, browserSync.reload))
}

function ramlBuild(cb) {
  return exec('yarn docs', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}

exports.build = ramlBuild
exports.watch = series(ramlBuild, browserLive, watchRaml)