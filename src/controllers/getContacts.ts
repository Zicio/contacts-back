import { Request, Response } from "express";
import contacts from "../data/contacts";

const getContacts = (req: Request, res: Response) => {
  try {
    res.status(200).json(contacts);
  } catch (e) {
    res.status(404).json((e as Error).message);
  }
};

export default getContacts;
