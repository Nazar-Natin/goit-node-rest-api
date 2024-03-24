import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} from "../services/contactsServices.js";

import catchAsync from "../helpers/catchAsync.js";

export const getAllContacts = catchAsync(async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const getOneContact = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const deleteContact = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const removedContact = await removeContact(id);
    res.status(200).json(removedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const createContact = catchAsync(async (req, res) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const updateOneContact = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = await updateContact(id, req.body);
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const updateStatus = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = await updateStatusContact(id, req.body);
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
