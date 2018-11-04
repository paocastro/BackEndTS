const Pool = require('pg').Pool
const pool = new Pool({
  user: 'gironmdt',
  host: 'lls.cbzuc4juconu.us-east-2.rds.amazonaws.com',
  database: 'LLS',
  password: 'Ingeniero127',
  port: 5432,
})


const getEventosByTipo = (request, response) => {
    var  idcolegio
    var tipo 
    idcolegio=request.params.idColegio
    tipo=parseInt(request.params.Tipo)

    pool.query('select EXTRACT(DAY FROM fechainicio) DIA,EXTRACT(MONTH FROM fechainicio) MES,* from eventos  WHERE idcolegio = $1  and tipo=$2' , [idcolegio,tipo], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}



module.exports = {
    getEventosByTipo
  }