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

  it("should list all customers", async () => {
    const firstCustomerCreation = await request(app)
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

    expect(firstCustomerCreation.status).toBe(200);

    const secondCustomerCreation = await request(app)
      .post("/customer")
      .send({
        name: "Doe",
        address: {
          street: "Fafa St",
          number: 321,
          zip: "654321",
          city: "Fafaland",
        },
      });

    expect(secondCustomerCreation.status).toBe(200);

    const response = await request(app).get("/customer").send();

    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);

    const customer1 = response.body.customers[0];
    const customer2 = response.body.customers[1];

    expect(customer1.name).toBe("John");
    expect(customer1.address.street).toEqual("Lalau St");
    expect(customer1.address.number).toEqual(123);
    expect(customer1.address.zip).toEqual("123456");
    expect(customer1.address.city).toEqual("Lalauland");

    expect(customer2.name).toBe("Doe");
    expect(customer2.address.street).toEqual("Fafa St");
    expect(customer2.address.number).toEqual(321);
    expect(customer2.address.zip).toEqual("654321");
    expect(customer2.address.city).toEqual("Fafaland");

    const listResponseXML = await request(app)
      .get("/customer")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?`
    );
  });
});
