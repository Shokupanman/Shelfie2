require("dotenv").config();
let express = require("express");
let massive = require("massive");
let ctrl = require("./controller");
let { SERVER_PORT, CONNECTION_STRING } = process.env;

let app = express();

app.get("/api/inventory", ctrl.getData);

app.use(express.json());

massive(CONNECTION_STRING).then(databaseConnection => {
  app.set("db", databaseConnection);
  console.log("Whats the status on Dinner?");
  app.listen(SERVER_PORT, () =>
    console.log(`${SERVER_PORT} Shokupanmen are toasty sir!`)
  );
});
