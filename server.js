const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.port || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.use((req, res, next) => {
    var now = new Date().toString();
    var methodreq = req.method;
    var urlreq = req.url;
    var log = 'Info: '+ now + ' Method: ' + methodreq + ' Url: ' +urlreq;
    console.log(log);

    fs.appendFile('serverlog.txt', log + '\n', (err) =>{
        if(err){
            console.log('Unable to append to server');
        }
    });

    next();
});

//maintence page
// app.use((req, res, next) =>{
//     res.render('maintenance.hbs');
// });

//register middleware gets dir
app.use(express.static(__dirname +'/public'));

//partial helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt' , (text) =>{
    return text.toUpperCase();
});



///////////////////////////////////////////////////

//home page
app.get('/', (req, res) =>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to tom`s webpage!',
    });
});

//about page
app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

//bad request page
app.get('/bad', (req, res) =>{
    res.send({
        response:'Unable to fufill request'
    });
});

///////////////////////////////////////////////////


//listen to server on port(3000)
app.listen(port, () =>{
    console.log('Server running on port '+port);
});