// подключаем gulp 
const { task, src, dest, watch, series } = require('gulp');
// для функционала удаления устаревших файлов из папки build 
const gulpRm = require('gulp-rm');
// для продолжения работы тасков, при возникновении ошибок в работе 
const plumber = require('gulp-plumber');
// для объединения файлов - склейка 
const fileInclude = require('gulp-file-include');

// Удаление устаревших файлов из папки build 
task('cleaner', function() {
return src('./build/**/*', { read: false })
.pipe(gulpRm());
});
// Объединение фрагментов на html-страницах
task('fileInclude', function() {
  return src('./source/html/*.html')
  .pipe(fileInclude())
  .pipe(dest('./build/'));
});
// Копирование файлов в build
task('html', function() {
  return src('./source/html/*.html')
  .pipe(plumber())
  .pipe(dest('./build/'))
});

// Слежение за изменением в исходных файлах проекта
watch('./source/html/**/*.html', 
series('html'));

// последовательное выполнение заданий 
task('default', series('cleaner', 'html'));
// параллельное выполнение заданий 
// gulp.task('default', gulp.parallel(copy));