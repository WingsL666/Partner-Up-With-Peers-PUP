//=======THIS WHERE FUNCTIONS ARE BEING CALLED=======

// Create express app
const University = require("./universities");
const CHelper = require("./universities");
const express = require("express");
const bcrypt = require("bcrypt");
const PUP = require("./login");

const universities = new CHelper("./data.sqlite");
const users = new PUP("./data/PUP.sqlite");
const app = express();

//enables parsing of json objects
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

//const users = [];

//goes to sign in page
app.get("/api/login", (req, res) => {
  res.send("Sign in page");
});

app.post("/api/login", async (req, res, next) => {
  try {
    //const password = req.body.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //console.log(password);
    console.log(salt);
    console.log(hashedPassword);
    const data = {
      email: req.body.email,
      password: hashedPassword,
      salt: salt,
    };
    var sql =
      "INSERT INTO login (log_user_email, log_user_id, log_hashed_password, log_salt) VALUES (?,?,?,?)";
    var params = [data.email, data.password, data.salt];
    db.run(sql, params, function (err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
        id: this.lastID,
      });
    });
    //users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/api/login/auth", async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (user == null) {
    return res.status(400).send("Cannot Find User");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Successs!");
    } else {
      res.send("Incorrect Password");
    }
  } catch {
    res.status(500).send();
  }
});

// Insert here other API endpoints

// Default response for any other request
app.use((req, res) => {
  res.status(404);
});

//start server
//PORT environment variable's value is set outside this application
const port = process.env.PORT || 4002;
app.listen(port, () => console.log(`Listening on port ${port}...`));
