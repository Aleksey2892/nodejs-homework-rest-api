const express = require('express')
const router = express.Router()
const { schemaCreateContact, schemaUpdateContact } = require('./validation')
const contactsController = require('../../../controllers/contacts')
const guard = require('../../../helpers/guard')

router
  .get('/', guard, contactsController.getAllContacts)
  .post('/', guard, schemaCreateContact, contactsController.createContact)

router
  .get('/:contactId', guard, contactsController.getContactById)
  .delete('/:contactId', guard, contactsController.removeContactById)
  .patch(
    '/:contactId',
    guard,
    schemaUpdateContact,
    contactsController.updateContactById
  )

module.exports = router
