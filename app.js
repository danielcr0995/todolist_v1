const express=require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
// const res = require('express/lib/response');
const date=require(__dirname +'/date.js');

mongoose.connect('mongodb://localhost:27017/todolistDB');

const itemSchema = new mongoose.Schema({
    name: String
});

const Item= mongoose.model('todoList', itemSchema);

const item1= new Item({
    name:'Welcome to your todo List'
});

const item2= new Item({
    name:'Click the "+" to add new items'
});

const item3= new Item({
    name:'<-- Hit this to delete them'
});



// item.save();
// Item.find(function(error,items){
//     if (error) console.log(error);
//     else{
//         mongoose.connection.close();
//         items.forEach(function(item){
//             console.log(item.name);
//         })
//     }
// })

const app= express();
// let items=[];
// let workItems=[];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true})); // read data that is entered in a form

app.use(express.static('public')); // name of folder where the styles and the images of the webpage are

app.get('/', function(req,res){
   
    let day =date.date();
    Item.find({},function(error,items){
        if (items.length ===0) {
            Item.insertMany([item1,item2,item3],function(error){
                if (error){console.log(error);
                }else console.log('Items added succesfully to DB');
            });
            res.redirect('/')
            
        }else{
            if (error) console.log(error);
            else{
                res.render('list', {
                    listTitle:day,
                    nItems:items,
                    
                });
            }
        
        }
    })
    //KindOfDay goes in ejs file, day is the variale in this file


})

app.post('/', function(req,res){
    // console.log(req.body);
    let itemName= req.body.newItem;//body parser has to required

    const newItem = new Item({
        name:itemName
    });
    newItem.save();
    res.redirect("/");
    // if(req.body.list==='Work'){
    //     workItems.push(item);
    //     res.redirect('/work')
    // // }else{
    // //     items.push(item);
    // //     res.redirect("/");
    // // }
    

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