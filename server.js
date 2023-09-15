const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");


const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ------------------------- Public File Access ------------------------- //

app.use("/public/files", express.static(path.join(__dirname, "/storages")));

// ------------------------- End Public File Access ------------------------- //



// ------------------------- Import Controllers ------------------------- //

const authController = require("./controllers/authController");

const usersController = require("./controllers/usersController");
// ------------------------- End Import Controllers ------------------------- //



// ------------------------- Import middlewares ------------------------- //
const middleware = require("./middlewares/auth");
// ------------------------- End Import middlewares ------------------------- //





// ------------------------- Define Routes ------------------------- //

// ------------------------- Auth ------------------------- //

app.post("/v1/auth/register", authController.handleRegister);
app.post("/v1/auth/login", authController.handleLogin);
app.get("/v1/auth/me", middleware.authenticate, authController.handleCurrentUser);

// ------------------------- End Auth ------------------------- //



// ------------------------- User System (complete users info) ------------------------- //

app.get("/v1/users", usersController.handleGetAllUsers);
app.get("/v1/users/:id", usersController.handleGetUserById);
app.put("/v1/users/update/:id", middleware.authenticate, usersController.handleUpdateUsers);
app.post("/v1/users/create",  usersController.handleCreateUser);
app.delete("/v1/users/delete/:id", usersController.handleDeleteUsers);

// ------------------------- End User System ------------------------- //

app.listen(process.env.PORT || 2000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });