var gulp = require('gulp'),
    less = require('gulp-less');

gulp.task('default', function() {
	  // 将你的默认的任务代码放在这
	//
});

gulp.task('less', function() {  
  return gulp.src('./build/css/*.less')
  .pipe(less())
  .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
	gulp.watch('./build/css/*.less', ['less']);
});
