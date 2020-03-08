// Setup empty JS object to act as endpoint for all routes
projectData = [
    {id:1,
    temp:15,
    usuario:'drtaupier'},
    {
    id:2,
    temp:18,
    usuario:'bye'
    }
]
    


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
app.get('/api/projectdata', (req, res) => {
    res.send(projectData);
});

//POST route 
app.post('/api/addData', (req, res)=>{
    console.log(req.body.json());
    res.send(req.body);
});

//PUT route
app.put()

//Delete route
app.delete()

//Inicialize the main project folder
app.use(express.static('website'));

const port = 3000;
//Spin up the server
const server = app.listen(port, listening);

//callback
function listening(){
    console.log(`Running on localhost: ${port}`);
}


