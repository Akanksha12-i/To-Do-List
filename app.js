const express=require("express");
const bodyParser=require("body-parser");

var app=express();

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/todo");
const trySchema =new mongoose.Schema({
  name:String
});

const item=mongoose.model("task",trySchema);
const todo1 =new item({
  name:"Practice C++"
});

const todo2 =new item({
  name:"Learn Javascript"
});
const todo3 =new item({
  name:"Start React"
});
const todo4 =new item({
  name:"Take some rest"
});
/*todo1.save();
todo2.save();
todo3.save();
todo4.save();*/
//var items=[];   //Since multiple items can be added in a list, we are using--
                //---array here

 
app.get("/",function(req,res){  //here 2 arguments 1)route 2)callback func.
  item.find({}).then(function(foundItems){
    res.render("list",{ejsx:foundItems});
 }).catch(function(err){
     console.log(err);
 });
});

app.post( "/",function(req,res){
  const itemName= req.body.ele1; //Here ele1 is the (name:"") of the input
  const todo5=new item({
    name:itemName
  });
  todo5.save();
  res.redirect("/");
});


app.post( "/delete",function(req,res){
const checked=req.body.checkbox1;
item.findByIdAndRemove(checked).then(function(){
  console.log("deleted");
  res.redirect("/");
});
});
app.listen("5000",function(){
    console.log("Server Started");
});

