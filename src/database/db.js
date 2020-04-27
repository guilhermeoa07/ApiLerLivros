const mongoose = require('mongoose')

module.exports = function (url) {

  mongoose.connect(url)

  mongoose.connection.on('connected', () => {
    console.log('Conectado com sucesso ao Mongo')
  })

  mongoose.connection.on('error', function (error) {
    console.log('Erro na conexão: ' + error)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Desconectado.')
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Conexão finalizada pelo terminal.')
      process.exit(0);
    })
  })
}