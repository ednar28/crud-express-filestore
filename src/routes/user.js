import express from 'express'
import { createRequest, updateRequest } from '../request/UserRequest.js'
var router = express.Router()

import { index, store, show, update, destroy, storeMany } from '../controller/UserController.js'

router.get('/', index)
router.post('/', createRequest, store)
router.post('/bulk', storeMany)
router.get('/:id', show)
router.put('/:id', updateRequest, update)
router.delete('/:id', destroy)

export default router