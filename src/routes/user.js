import express from 'express'
var router = express.Router()

import { index, store, show, update, destroy, storeMany } from '../controller/UserController.js'

router.get('/', index)
router.post('/', store)
router.post('/bulk', storeMany)
router.get('/:id', show)
router.put('/:id', update)
router.delete('/:id', destroy)

export default router