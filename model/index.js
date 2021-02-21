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

  return await db.push({ id: createId, ...body }).write()
}

const removeContact = async (contactId) => {
  const id = normalizeId(contactId)

  return await db.remove({ id }).write()
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
