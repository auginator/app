const gulp = require('gulp');
const debug = require('gulp-debug');

gulp.task('worker', () => {
    return gulp.src(['node_modules/crossbarInterface.summitsync.com/dist/workers/worker.shared.js'])
        .pipe(debug({ title: 'workers build' }))
        .pipe(gulp.dest('dist-resources/workers'));
});