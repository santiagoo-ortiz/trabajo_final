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



test("POST /cart should create one product in the car", async () => {

    const product = await Product.create({
        title: "Test uno product",
        description: "description test",
        price: "4.000"
      })

    const cartProduct = {
      quantity: "2",
      productId: product.id,
    };

    const res = await request(app)
      .post("/cart")
      .send(cartProduct)
      .set("Authorization", `Bearer ${token}`);
    await product.destroy();
    expect(res.statusCode).toBe(201);
    expect(res.body.quantity).toBe(cartProduct.quantity);

    
  });


