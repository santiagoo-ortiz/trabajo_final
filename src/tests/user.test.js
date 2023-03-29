const request = require('supertest')
const app = require('../app')

let token;
let userId;

test('/POST crear nuevo usuario', async() => {
    const newUser = {
        firstName: "test",
        lastName: "uno",
        email: "test@gmail.com",
        password: "testpassword",
        phone: "+57 123 456 7890"
    }
    const res = await request(app).post('/users').send(newUser)
    userId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body.email).toBe(newUser.email)
})


test("POST /users/login", async () => {
    
    const user = {
      email: "test@gmail.com",
      password: "testpassword",
    };

    const res = await request(app).post("/users/login").send(user);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(user.email);
  });


test('/GET obtener los usuarios creados', async() => {


    const res = await request(app).get('/users')
    .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(2)
})

test('/PUT actualizar nuevo usuario', async() => {
    const newUser = {
        lastName: "dos"
    }
    const res = await request(app).put(`/users/${userId}`)
    .send(newUser)
    .set("Authorization", `Bearer ${token}`);


    expect(res.statusCode).toBe(200)
    expect(res.body.lastName).toBe(newUser.lastName)
})



test('/DELETE borrar el usuario creado', async() => {


    const res = await request(app)
    .delete(`/users/${userId}`)
    .set("Authorization", `Bearer ${token}`);


    expect(res.statusCode).toBe(204)
})

