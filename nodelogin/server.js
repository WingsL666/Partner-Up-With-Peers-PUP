//=======THIS WHERE FUNCTIONS ARE BEING CALLED=======

// Create express app
const express = require("express");
const bcrypt = require("bcrypt");
const PUP = require("./login");

const users = new PUP("./data/PUP.sqlite");
const app = express();

var global_user_id;

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
    const email = req.body.email;
    const id = req.body.id;

    global_user_id = id; ////////////////////////////////////////////////////
  
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //console.log(email);
    //console.log(password);
    //console.log(salt);
    //console.log(hashedPassword);

    try {users.signIn(email, id, hashedPassword, salt).then((data) => {
        res.json({
          message: "success",
          data: data,
        })
      });
  } catch {
    res.status(400).json({"error": err.message})
    return;
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
    res.status(400).json({"error": err.message})
    return;
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
