var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var stripCssComments = require('gulp-strip-css-comments');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');
var beep = require('beepbeep');
var preprocess = require('gulp-preprocess')


var preprocess_context;

var onError = function (err) {
	beep([0]);
	gutil.log(gutil.colors.green(err));
};

gulp.task('clean', function () {
	gulp.src('build/*', {
			read: false
		})
		.pipe(clean({
			force: true
		}));
});

gulp.task('index', function () {
	gulp.src(['src/*.html'])
		.pipe(preprocess(preprocess_context))
		.pipe(gulp.dest('./build'));
	gulp.src(['src/*.ico'])
		.pipe(gulp.dest('./build'))
});

// gulp.task('js-min', function() {
// 	return gulp.src(['src/js/**/*.js', 'src/js/helpers/**/*.js', 'src/js/libs/**/*.js', 'src/js/views/**/*.js'])
// 		.pipe(uglify())
// 		.pipe(rename({
// 	 		extname: '.min.js'
// 		}))
// 		.pipe(preprocess(preprocess_context))
// 		.pipe(gulp.dest('./build/js'))
// });

gulp.task('js-reg', function() {
	return gulp.src(['src/js/**/*.js', 'src/js/helpers/**/*.js', 'src/js/libs/**/*.js', 'src/js/views/**/*.js'])
		.pipe(uglify())
		.pipe(preprocess(preprocess_context))
		.pipe(gulp.dest('./build/js'))
})

gulp.task('styles', function () {
	gulp.src('src/scss/**/*.scss')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sass({
			errLogToConsole: true
		}))
		// .pipe(stripCssComments())
		.pipe(gulp.dest('./build/css'));
});

gulp.task('assets', function () {
	gulp.src(['src/img/**/*'])
		.pipe(gulp.dest('./build/img'))
	gulp.src(['src/fonts/**/*'])
		.pipe(gulp.dest('./build/fonts'))
	gulp.src(['src/templates/**/*.html'])
		.pipe(gulp.dest('./build/templates'))
});

gulp.task('projects', function () {
	gulp.src(['src/js/**/*.json'])
		.pipe(gulp.dest('./build/js'))
});


gulp.task('minify-css', function () {
	return gulp.src('build/css/**/*.css')
		.pipe(minifyCss({
			compatibility: 'ie9'
		}))
		.pipe(gulp.dest('./build/css'));
});

gulp.task('build', ['index', 'js-reg', 'styles', 'assets', 'projects', 'minify-css']);

gulp.task('watch', function () {
	gulp.watch(['src/js/**/*.js', 'src/js/helpers/**/*.js', 'src/js/libs/**/*.js', 'src/js/views/**/*.js'], ['js-reg']);
	// gulp.watch(['src/js/**/*.js', 'src/js/helpers/**/*.js', 'src/js/libs/**/*.js', 'src/js/views/**/*.js'], ['js-min']);
	gulp.watch('src/**/*.html', ['index']);
	gulp.watch('src/js/**/*.json', ['projects']);
	gulp.watch(['src/img/**/*', 'src/fonts/**/*', 'src/templates/**/*.html'], ['assets'])
	gulp.watch(['src/scss/**/*.scss', 'src/scss/libs/**/*.scss'], ['styles']);
	gulp.watch('build/**/*.css' ['minify-css']);
});

gulp.task('default', ['build', 'watch'])
// gulp.task('preview', ['preview-build', 'watch'])
// gulp.task('debug', ['debug-build', 'watch'])
// gulp.task('release', ['release-build', 'watch'])
