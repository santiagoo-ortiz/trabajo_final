const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require("../models");

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

//sirve sin relaciones

test("POST /purchases should create one product in the car", async () => {

    const product = await Product.create({
        title: "Test dos product",
        description: "description test",
        price: "4.000"
      })

    const purchase = {
      quantity: "2",
      productId: product.id,
    };

    const res = await request(app)
      .post("/purchases")
      .send(purchase)
      .set("Authorization", `Bearer ${token}`);
    await product.destroy();
    expect(res.statusCode).toBe(201);
    expect(res.body.quantity).toBe(purchase.quantity);

    
  });

