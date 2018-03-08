var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

console.log("PROCESS.ENV --------");
console.log(process.env);

//Retrieve Cloudant credentials from env variables
cloudantService = JSON.parse(process.env.CLOUDANT_SERVICE);
var items = require('./routes/items');

//Setup middleware.
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'www')));

//REST HTTP Methods
app.get('/db/:option', items.dbOptions);
app.get('/items', items.list);
app.get('/fib', items.fib);
app.get('/loadTest', items.loadTest);
app.get('/items/:id', items.find);
app.post('/items', items.create);
app.put('/items/:id', items.update);
app.delete('/items/:id', items.remove);

app.listen(process.env.WEB_PORT);
console.log('App started on ' + process.env.WEB_PORT);
