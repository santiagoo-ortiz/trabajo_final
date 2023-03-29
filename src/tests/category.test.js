const request = require('supertest')
const app = require('../app')

let token;
let categoryId;


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

    categoryId = res.body.id

    expect(res.status).toBe(201)
})



test('/GET obtener las categorias creadas', async() => {

//funciona si se le agregan los products o si se borra el "include en el controlados"

    const res = await request(app).get('/categories')

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(1)
})



test('/DELETE delete the selected category', async () => {

    const res = await request(app)
    .delete(`/categories/${categoryId}`)
    .set("Authorization", `Bearer ${token}`)
    
    expect(res.statusCode).toBe(204)
})