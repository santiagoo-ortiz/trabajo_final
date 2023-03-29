const request = require("supertest");
const app = require("../app");
const ProductImg = require("../models/ProductImg");
require("../models");

let token;
let productId;

//Sirve sin las relaciones  en el index

beforeAll( async() => {
    const user = {
        email: "testuno@gmail.com",
        password: "nose"
    }

    const res = await request(app).post('/users/login').send(user);
    console.log(res.body);
    token = res.body.token
})


test("POST /products crear un producto", async () => {

    const product = {
      title: "Test uno product",
      description: "description test",
      price: "4.000"
    };

    const res = await request(app).post("/products").send(product).set("Authorization", `Bearer ${token}`);
 
    productId = res.body.id

    expect(res.status).toBe(201);
    expect(res.body.title).toBe(product.title);
  });



test("GET /products traer todos los productos", async () => {
    const res = await request(app).get("/products");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });


  test("POST /products/:id/images ", async () => {
    const image = await ProductImg.create({ url: "12313", filename: "123f12" });
    const res = await request(app)
      .post(`/products/${productId}/images`)
      .send([image.id])
      .set("Authorization", `Bearer ${token}`);
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  test('/PUT actualizar nuevo producto', async() => {
    const newProduct = {
        title: "nuevo titulo"
    }
    const res = await request(app).put(`/products/${productId}`)
    .send(newProduct)
    .set("Authorization", `Bearer ${token}`);


    expect(res.statusCode).toBe(200)
    expect(res.body.title).toBe(newProduct.title)
})


test("GET /products traer un producto", async () => {
  const res = await request(app).get(`/products/${productId}`);
  expect(res.status).toBe(200);
});


  test('/DELETE borrar el producto creado', async() => {


    const res = await request(app)
    .delete(`/products/${productId}`)
    .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204)
})