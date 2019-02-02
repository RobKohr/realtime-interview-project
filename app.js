const port = 4000;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const CallbackTree = require("./lib/CallbackTree");
const PromiseTree = require("./lib/PromiseTree");
const SyncTree = require("./lib/SyncTree");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/sync", (req, res) => {
  return res.json(new SyncTree(req.body).flatten());
});

app.post("/callback", (req, res) => {
  new CallbackTree(req.body).flatten(out => res.json(out));
});

app.post("/promise", (req, res) => {
  new PromiseTree(req.body)
    .flatten()
    .then(out => res.json(out))
    .catch(error => res.json(error));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
const exec = require("child_process").exec;
