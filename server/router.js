module.exports = function (app) {
  // define a route
  app.get('/', function (req, res) {
    res.sendFile('./welcome.html', { root: __dirname })
  })
  // greet
  let greet = require('./controllers/greet.controller')
  app.get('/greetContract/deploy/:message', greet.deployContract)
  app.get('/greetContract/allEvents/:contractAddress', greet.getAllEvents)
  app.get(
    '/greetContract/update/:contractAddress/:message',
    greet.updateContract
  )
  app.get('/db', greet.getDataFromDB)

  // request credentials
  app.get('/requestToken', function (req, res) {
    let request = {
      requested: ['name', 'phone'],
      callbackUrl: 'https://dean-stack-server.azurewebsites.net/',
      notifications: true
    }
    credentials.createRequest(request).then(requestToken => {
      credentials.receive(requestToken).then(creds => {
        console.log(creds)
      })
      let uri =
        'https://id.uport.me/me?requestToken=' +
        requestToken +
        '&callback_type=post'
      res.json({
        requestToken: requestToken,
        uri: uri
      })
    })
  })
}
