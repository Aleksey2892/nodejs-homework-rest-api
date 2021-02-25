const db = require('./db')
const { ObjectId } = require('mongodb')
const { getCollection } = require('./helpers')

const listContacts = async () => {
  const collection = await getCollection(db, 'contacts')

  return await collection.find().toArray()
}

const getContactById = async (contactId) => {
  const _id = new ObjectId(contactId)
  const collection = await getCollection(db, 'contacts')

  const [contact] = await collection.find({ _id }).toArray()

  return contact
}

const addContact = async (body) => {
  const createContact = { ...body }

  const collection = await getCollection(db, 'contacts')
  const {
    ops: [newContact],
  } = await collection.insert(createContact)

  return newContact
}

const removeContact = async (contactId) => {
  const _id = new ObjectId(contactId)
  const collection = await getCollection(db, 'contacts')

  const { value: deletedContact } = await collection.findOneAndDelete({ _id })

  return deletedContact
}

const updateContact = async (contactId, body) => {
  const _id = new ObjectId(contactId)
  const collection = await getCollection(db, 'contacts')

  const { value: updatedContact } = await collection.findOneAndUpdate(
    { _id },
    { $set: body },
    { returnOriginal: false }
  )

  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
