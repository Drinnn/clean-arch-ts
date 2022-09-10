import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E Test - Customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Lalau St",
          number: 123,
          zip: "123456",
          city: "Lalauland",
        },
      });

    expect(response.status).toBe(200);

    expect(response.body.name).toBe("John");
    expect(response.body.address.street).toBe("Lalau St");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe("123456");
    expect(response.body.address.city).toBe("Lalauland");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "John",
    });

    expect(response.status).toBe(500);
  });
});
