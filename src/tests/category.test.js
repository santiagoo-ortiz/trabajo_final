const request = require('supertest')
const app = require('../app')

let token;


beforeAll( async() => {
    const user = {
        email: "testuno@gmail.com",
        password: "nose"
    }

    const res = await request(app).post('/users/login').send(user);
    console.log(res.body);
    token = res.body.token
})

test('/POST create a category', async () => {

    const category = {name: "testuno"}

    const res = await request(app).post('/categories')
    .send(category)
    .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(201)
})