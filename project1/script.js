'use strict';

const personalMovieDB = {
  count: 0,
  movies: {},
  actors: {},
  genres: [],
  privat: false,
  start() {
    do {
      this.count = +prompt('Сколько фильмов вы уже посмотрели', '');
    } while (this.count == '' || this.count == null, isNaN(this.count));
  },
  rememberMyFilms() {
    for (let i = 0; i < 2; i++) {
      const film = prompt('Один из последних просмотренных фильмов?', '');
      const rating = +prompt('На сколько оцените его?', '');
      if (!film || film.length > 50 || isNaN(rating)) {
        i--;
      } else {
        this.movies[film] = rating;
      }
    }
  },
  detectPersonalLevel() {
    if (this.count < 10) {
      alert('Просмотрено довольно мало фильмов');
    } else if (this.count >= 10 && this.count <= 30) {
      alert('Вы классический зритель');
    } else if (this.count > 30) {
      alert('Вы киноман');
    } else {
      alert('Произошла ошибка');
    }
  },
  showMyDB() {
    if (!this.privat) {
      console.log(this);
    }
  },
  writeYourGenres() {
    for (let i = 1; i < 2; i++) {
      // const favoriteGenre = prompt(`Ваш любимый жанр под номером ${i}`);

      const favoriteGenres = prompt('Введите ваши любимые жанры через запятую', '');

      if (favoriteGenres == '' || favoriteGenres == null) {
        alert('Вы ввели некорректные данные ил не ввели их вовсе');
        i--;
      } else {
        this.genres = favoriteGenres.split(', ');
      }
    }
    this.genres.forEach((genre, i) => console.log(`Любимый жанр ${i + 1} - это ${genre}`));
  },
  toggleVisibleMyDB() {
    this.privat = !this.privat;
  }
};

const MyDB = personalMovieDB;

// MyDB.start();
// MyDB.rememberMyFilms();
// MyDB.detectPersonalLevel();
// MyDB.writeYourGenres();

// MyDB.showMyDB();
// console.log('Значение privat', MyDB.privat);
// MyDB.toggleVisibleMyDB();
// console.log('Значение privat после тоглера', MyDB.privat);
// MyDB.showMyDB();