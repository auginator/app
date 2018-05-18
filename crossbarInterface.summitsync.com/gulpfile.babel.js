const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const configuration = require('./webpack.config');
const gutil = require("gulp-util");
const webpack = require("webpack");

gulp.task('default-old', () =>
    gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            /*presets: [{
                "plugins": [
                    "transform-decorators-legacy",
                    "transform-class-properties"
                ],
                "presets": [
                    [
                        "env", {
                            "targets": process.env.BABEL_TARGET === 'node' ? {
                                "node": process.env.IN_PROTRACTOR ? '6' : 'current'
                            } : {
                                    "browsers": [
                                        "last 2 versions",
                                        "not ie <= 11"
                                    ],
                                    "uglify": process.env.NODE_ENV === 'production',
                                },
                            "loose": true,
                            "modules": process.env.BABEL_TARGET === 'node' ? 'commonjs' : false,
                            "useBuiltIns": true
                        }
                    ]
                ]
            }]*/
            presets: ["es2015"]
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
);

gulp.task("webpack", function (callback) {
    // run webpack
    webpack({
        configuration
    }, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('default', ['webpack']);