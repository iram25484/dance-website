// you can copy 1 to 8 and start server from previous tut or cwh 

//1 
const express= require("express");
const app=express();
const path=require("path");
const bodyparser=require("body-parser");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

}

///run terminal add one terminal type mongod thwn ctrl+c then npm install mongoose  in terminal then add one more terminal and write mongosh and then use contactDance
///write npm install body-parser in first terminal out of 3 then add line const bodyparser=require("body-parser") it is used to save body in the database useing express
// we dont rquire this one const fs=require("fs");
const port=8000;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
  });

  const Contact = mongoose.model('Contact', contactSchema);


//run terminal and write npm init , specify pacakge name , description and author and yes
//pckgae,json will be installed ,  add dev and start inside script of it for nodemon to run

//write npm install express in terminal
//write npm install pug in terminal
// make a folder called views(it will have all the templates)
// line 1 to 
//to use express write imp commands as given in previous tut:
app.use('/static',express.static('static'))// make a folder static
app.use(express.urlencoded())
//pug sppecific
app.set('view engine','pug') //set template engine as pug
//endpoints
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);  //earlier we used index.pug before using inherited template in pug . after using inherited template ie. home.pug we have input home.pug in place od index.pug although both do the ssme work
})

app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params)
}) 


///
app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{           ///save will return a promise terfore we will have to write .then and eveeyrthig in node js are asynchronous
        req.send("item is save in contact database")
    }).catch(()=>{
        res.status(400).send("item was not saved in database")
    })
//    res.status(200).render('contact.pug'); 
}) 



//startt sevrer

app.listen(port,()=>
{
    console.log(`application is running on port ${port}`)
});
//8

//make a template index.pug in views
//go to index


/// either you start nodemo or you run terminal again type node filename...

///go to mongosh terminal down there then type use contactDance and then show collections
///then  db.contacts.find()
