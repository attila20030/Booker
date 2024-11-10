import express from 'express'

import * as adminController from '../controllers/admin.js'

const router = express.Router()

// /admin/add-book => GET
router.get('/add-book', adminController.getAddbook)

// /admin/books => GET
router.get('/books', adminController.getbooks)

// /admin/add-book => POST
router.post('/add-book', adminController.postAddbook)

// /admin/edit-book/0.154875214 => GET
router.get('/edit-book/:bookId', adminController.getEditbook)

// /admin/edit-book => POST
router.post('/edit-book', adminController.postEditbook)

// /admin/delete-book => DELETE
router.post('/delete-book', adminController.postDeletebook)

export default router