import express from 'express'

import * as listOfBooksController from '../controllers/books.js'

const router = express.Router()

// / => GET
router.get('/', listOfBooksController.getIndex)

// /books => GET
router.get('/books', listOfBooksController.getbooks)

// /books/0.012548 => GET
router.get('/books/:bookId', listOfBooksController.getbook)

// /cart => GET
router.get('/cart', listOfBooksController.getCart)

// /cart => POST
router.post('/cart', listOfBooksController.postCart)

// /cart-delete-item => POST
router.post('/cart-delete-item', listOfBooksController.postCartDeletebook)

// /order => GET
router.get('/list', listOfBooksController.getlist)

// /checkout => GET
router.get('/checkout', listOfBooksController.getCheckout)

export default router