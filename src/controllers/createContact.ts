import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import contacts from "../data/contacts";
import { IContact } from "../models/models";

const createContact = async (req: Request, res: Response) => {
  try {
    const newContact: IContact = await req.body;
    newContact.id = uuidv4();
    contacts.push(newContact);
    res.status(201).json("Контакт успешно создан");
  } catch (e) {
    res.status(404).json((e as Error).message);
  }
};

export default createContact;
