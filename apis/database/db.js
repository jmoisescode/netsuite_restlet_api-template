const server = 'server'


const poolSQL = {
  user:'userid', 
  password: 'password',
  server: server,
  database: 'database',
  driver: 'msnodesqlv8',
  options: {
    trustedConnections: true
  } 
}
module.exports = {
  poolSQL
}