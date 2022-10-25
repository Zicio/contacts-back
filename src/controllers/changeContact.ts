import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import contacts from "../data/contacts";
import { IContact } from "../models/models";

const changeContact = async (req: Request, res: Response) => {
  try {
    const newContact: IContact = await req.body;
    if (newContact.id) {
      const oldContactIndex: number = contacts.findIndex(
        (el) => el.id === newContact.id
      );
      oldContactIndex !== -1 && contacts.splice(oldContactIndex, 1, newContact);
      res.status(200).json("Контакт успешно изменен");
    } else {
      newContact.id = uuidv4();
      contacts.push(newContact);
      res.status(201).json("Контакт успешно создан");
    }
  } catch (e) {
    res.status(404).json((e as Error).message);
  }
};

export default changeContact;
