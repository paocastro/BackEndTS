const Pool = require('pg').Pool
const pool = new Pool({
  user: 'gironmdt',
  host: 'lls.cbzuc4juconu.us-east-2.rds.amazonaws.com',
  database: 'LLS',
  password: 'Ingeniero127',
  port: 5432,
})


const getPersonas = (request, response) => {
    pool.query('SELECT * FROM Personas ', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}


const getPersonasByID = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM Personas WHERE IdPersona = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createPersonas = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  }

  module.exports = {
    getPersonas,
    getPersonasByID,
    createPersonas,
  }