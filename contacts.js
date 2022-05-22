const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const dataString = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(dataString);
};

const getContactById = async (id) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === id);
  return contact ? contact : null;
};

const addContact = async (name, email, phone) => {
  const newContact = {
    id: uuid.v4(),
    name: name,
    email: email,
    phone: phone,
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
};

const removeContact = async (id) => {
  const allContacts = await listContacts();
  const removedContact = allContacts.find((contact) => contact.id === id);
  const updatedContacts = allContacts.filter((contact) => {
    return contact.id !== id;
  });
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return removedContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
