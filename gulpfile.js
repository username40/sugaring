let projectFolder = require("path").basename(__dirname);
let sourceFolder = "#src";

let path = {
    build: {
        html: `${projectFolder}/`,
        css: `${projectFolder}/css/`,
        libs: `${projectFolder}/libs/`,
        js: `${projectFolder}/js/`,
        img: `${projectFolder}/img/`,
        fonts: `${projectFolder}/fonts/`,
    },
    src: {
        html: [`${sourceFolder}/*.html`, "!" + sourceFolder + "/_*.html"],
        css: `${sourceFolder}/scss/style.scss`,
        libs: `${sourceFolder}/libs/*`,
        js: `${sourceFolder}/js/script.js`,
        img: `${sourceFolder}/img/**/*.+(png|jpg|jpeg|gif|ico|svg|webp)`,
        fonts: `${sourceFolder}/fonts/*.ttf`,
    },
    watch: {
        html: `${sourceFolder}/**/*.html`,
        css: `${sourceFolder}/scss/**/*.scss`,
        js: `${sourceFolder}/js/**/*.`,
        img: `${sourceFolder}/img/**/*.+(png|jpg|gif|ico|svg|webp)`
    },
    clean: `./${projectFolder}/`
}

let { src, dest } = require('gulp');
let gulp = require('gulp');
let browsersync = require('browser-sync').create();
let fileinclude = require('gulp-file-include');
let del = require('del');
let scss = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let groupmedia = require('gulp-group-css-media-queries');
let cleancss = require('gulp-clean-css');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify-es').default;
let imagemin = require('gulp-imagemin');
let webp = require('gulp-webp');
let htmlmin = require('gulp-htmlmin');
// let webphtml = require('gulp-webp-html');
let webpcss = require('gulp-webpcss');
let svgSprite = require('gulp-svg-sprite');
let ttf2woff = require('gulp-ttf2woff');
let ttf2woff2 = require('gulp-ttf2woff2');
let fonter = require('gulp-fonter');
let fs = require('fs')

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: `./${projectFolder}/`,
            port: 3000,
            notify: false
        }
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        // .pipe(webphtml())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(groupmedia())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(cleancss())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function libs() {
    return src(path.src.libs)
        .pipe(dest(path.build.libs))
}

function images(params) {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function fonts(params) {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
}

function fontsStyle(params) {
    let file_content = fs.readFileSync(sourceFolder + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(sourceFolder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(sourceFolder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb() {

}

gulp.task('svgSprite', function () {
    return gulp.src([`${sourceFolder}/iconsprite/*.svg`])
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../icons/icons.svg",
                    example: true
                }
            }
        }
        ))
        .pipe(dest(path.build.img))
});

gulp.task('otf2ttf', function () {
    return gulp.src([`${sourceFolder}/fonts/*.otf`])
        .pipe(fonter({
            formats: ["ttf"]
        }))
        .pipe(dest(`${sourceFolder}/fonts/`))
});

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean(params) {
    return del([path.clean])
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts, libs), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;