import request from 'supertest'
import faker from 'faker'
import app from '../../app'
import db from './../../helpers/db/mysql'

const agent = request.agent(app)

describe('User API Endpoint', async () => {
  let token
  beforeAll(async () => {
    const loginData = {
      email: 'admin@bear.io',
      password: 'password',
    }
    const { body } = await agent
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(loginData)
    token = body.token
    await db('user').insert({
      id: 'd42c3ebf-4ae6-4578-ba65-0c8f48b7f41f',
      email: 'test@bear.io',
      password: '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka',
      username: 'DeleteMe',
      avatarUrl: 'https://bear.io/images/unknown-avatar.png',
      website: 'https://bear.io',
      verified: true,
    })
  })
  test('+++ GET /users -- List', () => {
    return agent.get('/api/v1/users').expect((res) => {
      expect(res.status).toBe(200)
      expect(Array.isArray(res.body.results)).toBe(true)
    })
  })

  test('+++ GET /users/:id -- ID', () => {
    return agent
      .get('/api/v1/users/1b062e26-df71-48ce-b363-4ae9b966e7a0')
      .expect((res) => {
        expect(res.status).toBe(200)
        expect(typeof res.body).toBe('object')
      })
  })
  test('+++ GET /users/:username/profile -- Profile', () => {
    return agent.get('/api/v1/users/Joey/profile').expect((res) => {
      expect(res.status).toBe(200)
      expect(typeof res.body).toBe('object')
    })
  })
  test('+++ UPDATE /users/:id', () => {
    return agent
      .put('/api/v1/users/1b062e26-df71-48ce-b363-4ae9b966e7a0')
      .set('Authorization', `Bearer ${token}`)
      .send({
        bio: `this is my bio ${Math.random()}`,
      })
      .expect((res) => {
        expect(res.status).toBe(202)
        expect(typeof res.body).toBe('object')
      })
  })
  test('+++ UPDATE /users/admin/:id', () => {
    return agent
      .put('/api/v1/users/admin/1b062e26-df71-48ce-b363-4ae9b966e7a0')
      .set('Authorization', `Bearer ${token}`)
      .send({
        bio: `this is my bio ${Math.random()}`,
      })
      .expect((res) => {
        expect(res.status).toBe(202)
        expect(typeof res.body).toBe('object')
      })
  })
  test('+++ DELETE /users/:id', () => {
    return agent
      .del('/api/v1/users/d42c3ebf-4ae6-4578-ba65-0c8f48b7f41f')
      .set('Authorization', `Bearer ${token}`)
      .expect((res) => {
        expect(res.status).toBe(204)
      })
  })
  test('+++ POST /users', () => {
    return agent
      .post('/api/v1/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: faker.internet.email(),
        password: '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka',
        username: faker.internet.userName(),
        avatarUrl: 'https://bear.io/images/unknown-avatar.png',
        website: 'https://bear.io',
      })
      .expect((res) => {
        expect(res.status).toBe(201)
      })
  })
})
