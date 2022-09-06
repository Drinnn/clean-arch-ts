import { InputCreateCustomerDto } from "./create.customer.dto";
import CreateCustomerUsecase from "./create.customer.usecase";

const input: InputCreateCustomerDto = {
  name: "John",
  address: {
    street: "Street",
    number: 123,
    zip: "Zip",
    city: "City",
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit Test - Create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUsecase(customerRepository);

    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });
  });
});
