import { Request, Response } from "express";
import contacts from "../data/contacts";

const deleteContact = async (req: Request, res: Response) => {
  try {
    const { id }: { id: string } = await req.body;
    const contactIndex: number = contacts.findIndex((item) => item.id === id);
    if (contactIndex === -1) {
      throw new Error("Контакт для удаления не найден");
    }
    contacts.splice(contactIndex, 1);
    res.status(200).json("Контакт успешно удалён");
  } catch (e) {
    res.status(404).json((e as Error).message);
  }
};

export default deleteContact;
