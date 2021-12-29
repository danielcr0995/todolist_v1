const express=require('express');
const bodyParser=require('body-parser');

const app= express();
items=[];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true})); // read data that is entered in a form

app.get('/', function(req,res){
    var today=new Date();
    var currentDay= today.getDay();
    // var day='';

    var options={
        weekday:'long',
        day:'numeric',
        month: 'long'
    };

    var day=today.toLocaleDateString('en-US', options);

    // switch (currentDay){
    //     case 0:
    //         day='Sunday';
    //         break;
    //     case 1:
    //         day='Monday';
    //         break;
    //     case 2:
    //         day='Tuesday';
    //         break;
    //     case 3:
    //         day='Wednesday';
    //         break;
    //     case 4:
    //         day='Thursday';
    //         break;
    //     case 5:
    //         day='Friday';
    //         break;
    //     case 6:
    //         day='Saturday';
    //         break;
    //     default:
    //         console.log('Error curent day is '+ curretDay);
    // }
    // if (currentDay===6 || currentDay===0){
    //     day='Weekend'
    // }else{
    //     day='Weekday'
    // }
    res.render('list', {
        kindOfDay:day,
        nItem:items,
        
    });//KindOfDay goes in ejs file, day is the variale in this file


})

app.post('/', function(req,res){
    const item= req.body.newItem;//body parser has to required
    items.push(item);
    res.redirect("/");

})

app.listen(3000, function(){
    console.log('Server stated on port 3000');
})