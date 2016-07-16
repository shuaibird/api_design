// middleware
function updateItemId() {
  return (req, res, next) => {
    ++itemId
    next()
  }
}


var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var port = 8080


// application-level middlewares: function
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


// mock database
var items = []
var itemId = 0


app.param('id', (req, res, next, id) => {
  var item = items.filter(item => item.id == id)[0]
  if (item) {
    req.item = item
    next()
  } else {
    res.send()
  }
})


// restful API
app.get('/items', (req, res) => {
  res.json(items)
  console.log('GET /items')
})

app.get('/items/:id', (req, res) => {
  res.json(req.item)
  console.log(`GET /items/${req.item.id}`)
})

app.post('/items', updateItemId(), (req, res) => {
  var item = req.body
  item.id = itemId
  items.push(item)
  res.json(item)
  console.log('POST /items')
})

app.put('/items/:id', (req, res) => {
  var updatedItem = req.body
  for (let item of items)
    if (item.id === req.item.id) {
      Object.assign(item, updatedItem)
      res.json(item)
    }
  console.log(`PUT /items/${req.item.id}`)
})

app.delete('/items/:id', (req, res) => {
  items = items.filter(item => item.id !== req.item.id)
  res.json(req.item)
  console.log(`DELETE /items/${req.item.id}`)
})


app.use((err, req, res, next) => {
  if (err)
    res.status(500).send(err)
})

app.listen(port, () => console.log(`listen on port: ${port}`))
