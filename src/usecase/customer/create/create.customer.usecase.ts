import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from "./create.customer.dto";
import Address from "../../../domain/customer/value-object/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";

export default class CreateCustomerUsecase {
  private readonly customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  public async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto> {
    const { name, address } = input;

    const customerAddress = new Address(
      address.street,
      address.number,
      address.zip,
      address.city
    );
    const customer = CustomerFactory.createWithAddress(name, customerAddress);

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
        city: customer.Address.city,
      },
    };
  }
}
