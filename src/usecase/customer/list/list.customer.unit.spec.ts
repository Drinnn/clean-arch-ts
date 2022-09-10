import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import { ListCustomerUseCase } from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "Customer1",
  new Address("Street 1", 1, "Zip1", "City1")
);

const customer2 = CustomerFactory.createWithAddress(
  "Customer2",
  new Address("Street 2", 2, "Zip2", "City2")
);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValue([customer1, customer2]),
  };
};

describe("Unit Test - List customers use case", () => {
  it("should list all customers", async () => {
    const customerRepository = MockRepository();
    const usecase = new ListCustomerUseCase(customerRepository);

    const output = await usecase.execute({});

    expect(output.customers.length).toBe(2);

    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toEqual(
      customer1.Address.street
    );
    expect(output.customers[0].address.number).toEqual(
      customer1.Address.number
    );
    expect(output.customers[0].address.zip).toEqual(customer1.Address.zip);
    expect(output.customers[0].address.city).toEqual(customer1.Address.city);

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toEqual(
      customer2.Address.street
    );
    expect(output.customers[1].address.number).toEqual(
      customer2.Address.number
    );
    expect(output.customers[1].address.zip).toEqual(customer2.Address.zip);
    expect(output.customers[1].address.city).toEqual(customer2.Address.city);
  });
});
