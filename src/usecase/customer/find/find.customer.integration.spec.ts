import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from "./find.customer.dto";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Integration test - Find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("123", "John Doe");
    const address = new Address("Lalau St", 123, "Zipcode", "Lalauland");
    customer.changeAddress(address);

    await customerRepository.create(customer);

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
