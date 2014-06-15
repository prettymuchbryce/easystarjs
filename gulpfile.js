var gulp = require('gulp');
var concat = require('gulp-concat');
var config = require('./package.json');
var sources = ['src/package-managers.js', 'src/node.js', 'src/priority-queue.js', 'src/instance.js', 'src/easystar.js'];
var uglify = require('gulp-uglify');
var karma = require('gulp-karma');

gulp.task('build', function() {
	gulp.run('concat', 'minify');
});

gulp.task('concat', function() {
	gulp.src(sources)
		.pipe(concat('easystar-' + config.version + '.js'))
		.pipe(gulp.dest('bin'));
});

gulp.task('minify', function() {
	gulp.src(sources)
		.pipe(concat('easystar-' + config.version + '.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('bin'));		
});

gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src(['bin/easystar-' + config.version + '.js', 'test/*.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});