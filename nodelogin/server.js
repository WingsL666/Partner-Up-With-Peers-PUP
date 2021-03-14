//=======THIS WHERE FUNCTIONS ARE BEING CALLED=======

// Create express app
const express = require("express");
const bcrypt = require("bcrypt");
const PUP = require("./login");

const users = new PUP("./data/PUP.sqlite");
const app = express();

const global_user_id;/////////////////////////////////////////////////////////add a global var

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
    const id = 1;
  
    global_user_id = id; ////////////////////////////////////////////////////
  
    const email = req.body.email;
    const password = req.body.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(email);
    console.log(password);
    console.log(salt);
    console.log(hashedPassword);
    try {users.signIn(email, id, hashedPassword, salt).then((data) => {
        res.json({
          message: "success",
          data: data,
        })
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

//get the info of peers
app.get("/api/peerInfo", (req, res, next) => { //
    login.allPeerInfo(global_user_id) /////////////////////////////////////
        .then((info) => { //
            res.json({
                "message": `${global_user_id}`,//////////////////////////////
                "data": info //
            })
        })
        .catch((err) => {
            res.status(400).json({ "error": err.message });
            return;
        })    
});

//get input from user about userInfo
app.get("/api/importInfo/:grade-:gender-:os-:language", (req, res, next) => { //
    login.importUserInfo(global_user_id, req.params.grade, req.params.gender, req.params.os, req.params.language) 
        .then((info) => { //
            res.json({
                "message": `${global_user_id} by ${req.params.grade} by ${req.params.gender} by ${req.params.os} by ${req.params.language}`,
                "data": info //
            })
        })
        .catch((err) => {
            res.status(400).json({ "error": err.message });
            return;
        })    
});


//get input from user about userCourse
app.get("/api/importCourse/:subject-:code-:status-:grade", (req, res, next) => { //
  login.importUserCourse(global_user_id, req.params.subject, req.params.code, req.params.status, req.params.grade) 
      .then((info) => { //
          res.json({
              "message": `${global_user_id} by ${req.params.subject} by ${req.params.code} by ${req.params.status} by ${req.params.grade}`,
              "data": info //
          })
      })
      .catch((err) => {
          res.status(400).json({ "error": err.message });
          return;
      })    
});


// Default response for any other request
app.use((req, res) => {
  res.status(404);
});

// Server port
var HTTP_PORT = 8092

// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});
