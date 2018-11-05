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

const getPersonasByNdoc = (request, response) => {
  const idColegio = (request.params.idColegio)
  const ndoc = (request.params.ndoc)


  pool.query('select * from GetUsuSistemasByNdoc($1, $2)', [idColegio, ndoc], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


//Obtener todos los estudiantes.
const getEstudiantes = (request, response) => {
  const idColegio = (request.params.idColegio)

  pool.query('select * from GetEstudiantes($1)', [idColegio], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//Obtener la informacion de los estudiantes segun el nombre
const getEstudiantesByName = (request, response) => {
  const idColegio = (request.params.idColegio)
  const name = (request.params.name)

  pool.query('select * from GetEstudiantesByName($1, $2)', [idColegio, name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//Obtener la informacion de los estudiantes segun el numero de documento
const getEstudiantesByNdoc = (request, response) => {
  const idColegio = (request.params.idColegio)
  const ndoc = (request.params.ndoc)

  pool.query('select * from GetEstudiantesByNdoc($1, $2)', [idColegio, ndoc], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//Obtener informacion de los estudiantes, segun el id de la persona.
const getEstudiantesByIdPersona = (request, response) => {
  const idColegio = (request.params.idColegio)
  const idPersona = (request.params.idPersona)

  pool.query('select * from getEstudiantesByIdPersona($1, $2)', [idColegio, idPersona], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const IUEstudiante = (request, response) => {
  const oEstudiante = request.body

  pool.query('select * from getEstudiantesByIdPersona($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13, $14, $15,$16,$17)',
    [oEstudiante.IdColegio, oEstudiante.IdPersona, oEstudiante.Tdoc,
    oEstudiante.Ndoc, oEstudiante.Nombres, oEstudiante.Apellidos, oEstudiante.FechaNac,
    oEstudiante.LugarNacimiento, oEstudiante.EstadoCivil, oEstudiante.RH, oEstudiante.EPS,
    oEstudiante.Tipo, oEstudiante.Estudiante.IdPadre, oEstudiante.Estudiante.IdMadre,
      ,oEstudiante.Estudiante.IdAcudiente, oEstudiante.Estudiante.NoHnos, oEstudiante.Estudiante.Grado]
    ,(error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
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
  getPersonasByNdoc,
}