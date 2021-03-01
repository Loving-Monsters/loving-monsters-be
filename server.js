const { http } = require('./lib/app');

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

// const pool = require('./lib/utils/pool');

// const PORT = process.env.PORT || 7890;

// app.listen(PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log(`Started on ${PORT}`);
// });

// process.on('exit', () => {
//   console.log('Goodbye!');
//   pool.end();
// });
