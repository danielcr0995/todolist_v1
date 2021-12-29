const express=require('express');
const bodyParser=require('body-parser');
const res = require('express/lib/response');
const date=require(__dirname +'/date.js');

const app= express();
let items=[];
let workItems=[];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true})); // read data that is entered in a form

app.use(express.static('public'));

app.get('/', function(req,res){
   
    let day =date.date();
    res.render('list', {
        listTitle:day,
        nItems:items,
        
    });//KindOfDay goes in ejs file, day is the variale in this file


})

app.post('/', function(req,res){
    // console.log(req.body);
    let item= req.body.newItem;//body parser has to required
    if(req.body.list==='Work'){
        workItems.push(item);
        res.redirect('/work')
    }else{
        items.push(item);
        res.redirect("/");
    }
    

})

// WORK LIST
app.get('/work', function(req,res){
    
    res.render('list', {listTitle:'Work List', nItems: workItems}); //list is the name of the ejs file
});

app.get('/about' ,function(req,res){
    res.render('about');
})

// app.post('/work', function(req,res){
//     console.log(req.body);
//     let item=req.body.newItem;
//     workItems.push(item);
//     res.redirect('/work')
// })

app.listen(3000, function(){
    console.log('Server stated on port 3000');
})