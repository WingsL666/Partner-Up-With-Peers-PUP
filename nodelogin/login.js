const sqlite3 = require("sqlite3").verbose();
const Promise = require("bluebird");

class Login {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log("Could not connect to database", err);
      } else {
        console.log("Connected to database");
      }
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = login;
