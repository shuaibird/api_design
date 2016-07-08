var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var port = 8080


// middlewares: function
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


// mock database
var items = []


// restful API
app.get('/items', (req, res) => {
  res.json(items)
  console.log('GET /items')
})

app.get('/items/:id', (req, res) => {
  var id = +req.params.id
  var item = items.filter(item => item.id === id)[0]
  res.json(item)
  console.log(`GET /items/:${id}`)
})

app.post('/items', (req, res) => {
  var item = req.body
  item.id = +new Date()
  items.push(item)
  res.json(item)
  console.log('POST /items')
})

app.put('/items/:id', (req, res) => {
  var id = +req.params.id
  var putItem = req.body
  for (let item of items)
    if (item.id === id) {
      Object.assign(item, putItem)
      res.json(item)
    }
  console.log(`PUT /items/:${id}`)
})

app.delete('/items/:id', (req, res) => {
  var id = +req.params.id
  var delItem
  items = items.filter(item => {
    if (item.id === id) {
      delItem = item
      return false
    }
    return true
  })
  res.json(delItem)
  console.log(`DELETE /items/:${id}`)
})


app.listen(port, () => console.log(`listen on port: ${port}`))