const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

gulp.task('default', () =>
    gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [{
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
            }]
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
);