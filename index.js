const db = require('./Services/PostgreSQL/queries.js')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
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

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})


