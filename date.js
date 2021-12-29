
module.exports.date=date;

function date(){
    let today=new Date();
    let currentDay= today.getDay();
    // var day='';

    let options={
        weekday:'long',
        day:'numeric',
        month: 'long'
    };

    let day=today.toLocaleDateString('en-US', options);
    return day;
}

module.exports.day=day;

function day(){
    let today=new Date();
    let currentDay= today.getDay();
    // var day='';

    let options={
        weekday:'long',        
    };

    let day=today.toLocaleDateString('en-US', options);
    return day;
}

console.log(module.exports);
