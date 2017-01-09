const request = require('supertest')
const assert = require('assert')
const Koa = require('koa')

const app = new Koa()

describe('Api test', function () {
  it('.route()', function (done) {

    const convert = require('koa-convert')
    const bodyParser = require('koa-better-body')

    // middlewares
    app.use(convert(bodyParser({
      formLimit: '200kb',
      jsonLimit: '200kb',
      bufferLimit: '4mb',
    })))

    request(app.callback())
      .get('/')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        assert.equal(res.text, 'This is index page')
        done()
      })
  })
})