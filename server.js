// Setup empty JS object to act as endpoint for all routes
projectData = []
    
//Express to run server and routes
const express = require('express');
//Start up an instance of app
const app = express();
app.use(express.json());
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

function myDate(){
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const hour = today.getHours();
    const minutes = today.getMinutes();
    const fechaActual = `${month}-${day}-${year} ${hour}:${minutes} hrs.`;
    return fechaActual;
}

//POST route 
app.post('/api/addData', (req, res)=>{
    let data = {
      id: getNextId(),
      temp: req.body.temp,
      feeling: req.body.feeling,
      date: myDate()
    }
    projectData.push(data);
    res.send('Información enviada con éxito');
    console.log(projectData);
});

const getNextId = () => projectData.length+1;

//Inicialize the main project folder
app.use(express.static('website'));

const port = 3000;
//Spin up the server
const server = app.listen(port, listening);

//callback
function listening(){
    console.log(`Running on localhost: ${port}`);
}


