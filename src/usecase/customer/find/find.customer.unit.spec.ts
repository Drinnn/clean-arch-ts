import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from "./find.customer.dto";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John Doe");
const address = new Address("Lalau St", 123, "Zipcode", "Lalauland");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockResolvedValue(customer),
    findAll: jest.fn(),
  };
};

describe("Test find customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const input: InputFindCustomerDto = {
      id: "123",
    };

    const output: OutputFindCustomerDto = {
      id: "123",
      name: "John Doe",
      address: {
        street: "Lalau St",
        number: 123,
        zip: "Zipcode",
        city: "Lalauland",
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
