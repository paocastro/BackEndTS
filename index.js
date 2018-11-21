const db = require('./Services/PostgreSQL/queries.js')
const dbEventos = require('./Services/PostgreSQL/queriesEventos.js')

const express = require('express')

const bodyParser = require('body-parser')
const app = express()
const port = 3000


// Add headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/Personas', db.getPersonas)
app.get('/Personas/:id', db.getPersonasByID)
app.get('/PersonasByNdoc/:idColegio/:ndoc', db.getPersonasByNdoc)
app.get('/EventosByTipo/:idColegio/:Tipo', dbEventos.getEventosByTipo)

app.post('/Personas', function(req, res) {
    var oData = req.body
    //console.log(req.body);
    console.log(oData.Ndoc);
	
});


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})


