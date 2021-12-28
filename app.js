const express=require('express');
const bodyParser=require('body-parser');

const app= express();

app.set('view engine', 'ejs');

app.get('/', function(req,res){
    var today=new Date();
    var currentDay= today.getDay();
    var day='';

    switch (currentDay){
        case 0:
            day='Sunday';
            break;
        case 1:
            day='Monday';
            break;
        case 2:
            day='Tuesday';
            break;
        case 3:
            day='Wednesday';
            break;
        case 4:
            day='Thursday';
            break;
        case 5:
            day='Friday';
            break;
        case 6:
            day='Saturday';
            break;
    }
    // if (currentDay===6 || currentDay===0){
    //     day='Weekend'
    // }else{
    //     day='Weekday'
    // }
    res.render('list', {kindOfDay:day});//KindOfDay goes in ejs file, day is the variale in this file
})

app.listen(3000, function(){
    console.log('Server stated on port 3000');
})