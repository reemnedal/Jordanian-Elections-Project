module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "0000",
      database: "jordanian_elections_project",
    },
    migrations: {
      directory: "./migrations", // مسار المجلد الذي يحتوي على ملفات المايقريشن
    },
    seeds: {
      directory: "./seeds", // مسار المجلد الذي يحتوي على ملفات السييد
    },
  },
};
