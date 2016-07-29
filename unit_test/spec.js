const TEST_DATA = {name: 'Shuabird'}

var app = require('../server/server')

var supertest = require('supertest')
var expect = require('chai').expect


describe('itemsRouter', () => {
  it('should get all items', done =>
    supertest(app)
      .get('/items')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  )

  it('should create an item', done =>
    supertest(app)
      .post('/items')
      .send(TEST_DATA)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  )

  it('should delete an item', done =>
    supertest(app)
      .post('/items')
      .send(TEST_DATA)
      .end((err, res) => {
        var item = res.body
        supertest(app)
          .delete(`/items/${item.id}`)
          .end((err, res) => {
            expect(res.body).to.eql(item)
            done()
          })
      })
  )

  it('should update an item', done =>
    supertest(app)
      .post('/items')
      .send(TEST_DATA)
      .end((err, res) => {
        var item = res.body
        var updatedItem = {name: item.name.split('')}
        supertest(app)
          .put(`/items/${item.id}`)
          .send(updatedItem)
          .end((err, res) => {
            expect(res.body.name).to.eql(updatedItem.name)
            done()
          })
      })
  )
})
