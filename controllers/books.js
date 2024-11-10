import book from '../models/books.js'
import Cart from '../models/cart.js'

export const getBooks = (req, res, next) => {
  const books = book.fetchAll()
  res.render('listOfBooks/book-list', {
    prods: books,
    pageTitle: 'All Books',
    path: '/books'
  })
}

export const getBook = (req, res, next) => {
  const booId = req.params.bookId;
  const book = book.findById(booId)
    res.render('listOfBooks/book-detail', {
      book: book,
      pageTitle: book.title,
      path: '/books'
    })
}

export const getIndex = (req, res, next) => {
  const books = book.fetchAll()
  res.render('book/index', {
    prods: books,
    pageTitle: 'Book Store',
    path: '/'
  })
}

export const getCart = (req, res, next) => {
  const cart = Cart.getCart()
  const books = book.fetchAll()
  const cartBooks = []
  for (let book of books) {
    const cartbookData = cart.books.find( prod => prod.id === book.id )
    if (cartbookData) {
      cartBooks.push({ bookData: book, qty: cartbookData.qty })
    }
  }
  res.render('listOfBooks/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    books: cart
  })
}

export const postCart = (req, res, next) => {
  const booId = req.body.bookId
  const book = book.findById(booId)
  Cart.addbook(booId, book.price)
  res.redirect('/cart')
}

export const postCartDeletebook = (req, res, next) => {
  const booId = req.body.bookId
  const book = book.findById(booId)
  Cart.deletebook(booId, book.price)
  res.redirect('/cart')
}

export const getlist = (req, res, next) => {
  res.render('listOfBooks/list', {
    path: '/list',
    pageTitle: 'Your list'
  })
}

export const getCheckout = (req, res, next) => {
  res.render('listOfBooks/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}