const db = require('./db')
const { nanoid } = require('nanoid')
const normalizeId = require('./helpers')

const listContacts = async () => {
  return await db.value()
}

const getContactById = async (contactId) => {
  const id = normalizeId(contactId)

  return await db.find({ id }).value()
}

const addContact = async (body) => {
  const createId = nanoid()

  const createContact = { id: createId, ...body }

  await db.push(createContact).write()

  return createContact
}

const removeContact = async (contactId) => {
  const id = normalizeId(contactId)

  const [contact] = await db.remove({ id }).write()

  return contact
}

const updateContact = async (contactId, body) => {
  const id = normalizeId(contactId)

  const updatedContact = await db.find({ id }).assign(body).write()

  return updatedContact.id ? updatedContact : null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
