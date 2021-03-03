const express = require("express");
const app = express();

app.get("/", function(req, res){
res.send("Hello dear!");
});

app.get("/contact", function(req,res){
  res.send("Contact me on 9999999");
});
app.get("/about", function(req, res){
  res.send("This is Vidit Awasthi");
});

app.listen(3000, function(){
  console.log("Server Started on Port 3000");
});
