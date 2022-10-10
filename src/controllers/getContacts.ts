import { Request, Response } from "express";
import contacts from "../data/contacts";

export const getContacts = (req: Request, res: Response) => {
  try {
    res.status(200).json(contacts);
  } catch (e) {
    console.log(e);
  }
};
