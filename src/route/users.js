const express = require('express')
const Router = express.Router()
const { usersController } = require('../controller/users')
const uploadImg = require('../middleware/upload')

Router.get('/', usersController.getUsers)
  .get('/filter', usersController.getUsersByFilter)
  .get('/search', usersController.getSearchUsers)
  .post('/', usersController.createUsers)
  // .put('/:id', usersController.update)
  .put('/:id', usersController.update)
  .patch(
    '/updateProfil/:id',
    uploadImg.singleUpload,
    usersController.updateProfil
  )
  .delete('/:id', usersController.deleteUsers)
module.exports = Router
