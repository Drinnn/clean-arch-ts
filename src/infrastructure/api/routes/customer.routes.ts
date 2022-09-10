import express, { Request, Response } from "express";
import { InputCreateCustomerDto } from "../../../usecase/customer/create/create.customer.dto";
import CreateCustomerUsecase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";

export const customerRoutes = express.Router();

customerRoutes.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUsecase(new CustomerRepository());
  try {
    const createCustomerDto: InputCreateCustomerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city,
      },
    };

    const output = await usecase.execute(createCustomerDto);

    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
