// Setup empty JS object to act as endpoint for all routes
projectData = {};

//Express to run server and routes
const express = require('express');
//Start up an instance of app
const app = express();

//Dependencies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

//GET route
app.get('/all', sendData);

function sendData(req, res){
    res.send(projectData);
};

//POST route 
app.post('/all', callBack);

function callBack(req, res){
    console.log(req.body);
    console.log(req.params)
    res.send('POST Received');
};

//Inicialize the main project folder
app.use(express.static('website'));

const port = 3000;
//Spin up the server
const server = app.listen(port, listening);

//callback
function listening(){
    console.log(`Running on localhost: ${port}`);
}


