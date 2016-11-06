'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.disable('x-powered-by');
app.use(express.static(__dirname + '/public'));

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(require('body-parser').urlencoded({extended: true}));
app.set('port', process.env.PORT || '8888');
app.use(bodyParser.json());
/*
app.get('/', function (req, res) {
    console.log('/ executed');
    res.render({msg: 'Hello Express.js'});
    //res.send('Hello Express.js');
});
*/
app.get('/', function (req, res) {
    res.status(200).render('index', {msg: 'Hello ExpressJs'});
});
app.get('/hello/', function (req, res) {
    console.log('hello');
    res.status(200).render('hello',{msg: 'Hello Stranger!'});
});

app.get('/post/', function (req, res) {
    console.log('post');
    res.status(200).render('post');
});

app.get('/hello/*', function (req, res) {
    console.log('hello+');
    res.status(200).render('hello', {msg: 'Hello, ' + req.params[0]});
});

app.use('/post', function(req, res, next) {
    if(req.header(req.body.key)) {
        next();
    }
    else {
        res.status(401).render('401', {msg: req.body.key});

    }

})

app.post('/post', function(req, res) {
    console.log('head', req.header('Host') );
    res.status(200).render('post-answer', {msg: JSON.stringify(req.body)});

})

app.all('/sub/*', function(req, res) {
    console.log('any works');
    console.log(req.params);
    res.status(200).render('any', {msg: 'Your requsted URL is: /sub/'+ req.params[0]});
});

app.listen(app.get('port'), function () {
    console.log('Express started on port http://localhost:' + app.get('port'));
});
/**
 * Created by HP on 11/3/2016.
 */
