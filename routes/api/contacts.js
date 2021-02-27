const express = require('express')
const router = express.Router()
const { schemaCreateContact, schemaUpdateContact } = require('./validation')
const contactsController = require('../../controllers/contacts')

router
  .get('/', contactsController.getAllContacts)
  .post('/', schemaCreateContact, contactsController.createContact)

router
  .get('/:contactId', contactsController.getContactById)
  .delete('/:contactId', contactsController.removeContactById)
  .patch(
    '/:contactId',
    schemaUpdateContact,
    contactsController.updateContactById
  )

module.exports = router
