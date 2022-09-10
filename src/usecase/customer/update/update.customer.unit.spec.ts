import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto } from "./update.customer.dto";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "Customer",
  new Address("Lalau St", 123, "123456", "Lalauland")
);

const input: InputUpdateCustomerDto = {
  id: customer.id,
  name: "Updated Customer",
  address: {
    street: "Updated St",
    number: 321,
    zip: "654321",
    city: "Updated city",
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockResolvedValue(customer),
    findAll: jest.fn(),
  };
};

describe("Unit Test - Update customer use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const usecase = new UpdateCustomerUseCase(customerRepository);

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
