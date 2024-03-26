import { Contact } from "../models/contactModel.js";

async function listContacts(query, owner) {
  const page = query.page ? +query.page : 1;
  const limit = query.limit ? +query.limit : 5;
  const docsToSkip = (page - 1) * limit;

  const filter = { owner };

  if (query.favorite) filter.favorite = query.favorite;

  const contacts = await Contact.find(filter).skip(docsToSkip).limit(limit);
  const total = await Contact.countDocuments(filter);

  return { total, contacts };
}

async function getContactById(id, owner) {
  const contact = await Contact.findOne({ _id: id, owner }, { lean: true });
  return contact;
}

async function removeContact(id, owner) {
  const contact = await Contact.findOne({ _id: id, owner }, { lean: true });

  await Contact.findOneAndDelete({ _id: id, owner });
  return contact;
}

async function addContact(contactData, owner) {
  const newContact = await Contact.create({ ...contactData, owner });
  return newContact;
}

async function updateContact(id, contactData, owner) {
  const contact = await Contact.findOne({ _id: id, owner }, { lean: true });

  await Contact.findOneAndUpdate({ _id: id, owner }, contactData);
  return contact;
}

async function updateStatusContact(id, contactStatus, owner) {
  const updatedStatusContact = await Contact.findOneAndUpdate(
    { _id: id, owner },
    contactStatus,
    { new: true }
  );
  return updatedStatusContact;
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
