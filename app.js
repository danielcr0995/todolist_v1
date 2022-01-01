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

const listSchema= new mongoose.Schema({
    name:String,
    items:[itemSchema]
});

const List = mongoose.model('List', listSchema);

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

const defaultItems=[item1,item2,item3]

app.get('/', function(req,res){
    let day =date.date();
    Item.find({},function(error,items){
        // console.log(items);

        if (items.length ===0) {
            Item.insertMany(defaultItems,function(error){
                if (error){console.log(error);
                }else console.log('Items added succesfully to DB');
            });
            res.redirect('/')
            
        }else{
            if (error) console.log(error);
            else{
                res.render('list', {
                    listTitle:"Today",
                    nItems:items,
                    
                });
            }
        
        }
    });
    //KindOfDay goes in ejs file, day is the variale in this file


});

app.get('/:listTitlePage', function(req,res){
    const lsTitle=req.params.listTitlePage;
    // console.log(lsTitle!=='');
    // res.render('list',{listTitle: lsTitle, nItems:items} )
    List.findOne({name:lsTitle},function (err,foundList) {
        // console.log(items.items);
       if (!err){
           if(foundList){
            //    console.log('exists');
               res.render('list', {
                listTitle:lsTitle,
                nItems:foundList.items,
               })
           }else{
            // console.log("doesn's exists");
            const list = new List({
                    name:lsTitle,
                    items: defaultItems
                });
            list.save();
            res.redirect('/'+lsTitle);
           }
           
       } 
    })

    // console.logF('holq');
    // 
        
    });
    


app.post('/', function(req,res){
    // console.log(req.body);
    let itemName= req.body.newItem;//body parser has to required
    let listName= req.body.list;
    const newItem = new Item({
        name:itemName
    });
    if (listName==='Today') {
        newItem.save();
        res.redirect("/");
        
    }else{

        List.findOne({name:listName}, function(err, foundList){
            if (!err) {
                foundList.items.push(newItem);
                foundList.save();
                res.redirect('/'+listName)
                
            }
        });
    }
    
    
    // if(req.body.list==='Work'){
    //     workItems.push(item);
    //     res.redirect('/work')
    // // }else{
    // //     items.push(item);
    // //     res.redirect("/");
    // // }
    

});

app.post('/delete',function(req,res){
    const checkItem = req.body.checkbox;
    const listName = req.body.listName;
    if (listName==='Today'){
        Item.deleteOne({_id:checkItem},function (err){
            if(err) console.log('could not delete item');
            else console.log('Succesfully deleted item');
        });
        res.redirect('/');
    }else{
        List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkItem}}}, function (err, foundList) {
            if (!err) {
                // console.log('Removed item from custom list');
                res.redirect('/'+listName);
            }
        }
    )};
    
});



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