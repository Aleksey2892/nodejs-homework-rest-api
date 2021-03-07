const Contact = require('./schemas/contactSchema')

const addContact = async (body) => {
  return await Contact.create(body)
}

const listContacts = async (userId) => {
  return await Contact.find({ owner: userId }).populate({
    path: 'owner',
    select: 'email',
  })
}

const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId }).populate({
    path: 'owner',
    select: 'email',
  })
}

const updateContact = async (contactId, body, userId) => {
  return await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  )
}

const removeContact = async (contactId, userId) => {
  console.log(contactId)
  return await Contact.findByIdAndRemove({ _id: contactId, owner: userId })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
