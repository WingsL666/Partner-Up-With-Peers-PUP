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

  signIn(log_user_email, log_user_id, log_hashed_password, log_salt) {
    return this.all(
      "INSERT INTO login (log_user_email, log_user_id, log_hashed_password, log_salt) VALUES (?, ?, ?, ?);",[log_user_email, log_user_id, log_hashed_password, log_salt]
    )
  }

  allPeerInfo(info_user_id){
    return this.all("select * from userInfo where info_user_id != ? ;", [info_user_id])
  }

}

module.exports = Login;
