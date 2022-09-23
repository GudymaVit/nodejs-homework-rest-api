const fs = require('fs/promises');
const path = require("path");
const id = require("uuid");

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(data);
    return contactsList;
}

const getContactById = async (contactId) => {
    try {
        const allContacts = await listContacts();
        const contact = allContacts.find(({ id }) => id === contactId);
        return contact;
    } catch (error) {
        console.log(error.message);
    }
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return result;
}

const addContact = async (name, email, phone) => {
   try {
      const newContact = {
          id: id.v4(),
          name: name,
          email: email,
          phone: phone,
      }
      const allContacts = await listContacts();
      const chengedContacts = [...allContacts, newContact];
      await fs.writeFile(contactsPath, JSON.stringify(chengedContacts));
      listContacts();
      return newContact;
  } catch (error) {
    
  }
}

const updateContact = async (contactId, name, email, phone) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
