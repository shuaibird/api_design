const port = 8080

var app = require('./server/server')

app.listen(port, () => console.log(`listen on port: ${port}`))
