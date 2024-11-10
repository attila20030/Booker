import fs from 'fs'
import path from 'path'

import __dirname from '../util/rootpath.js'

const cartPath = path.join(__dirname, 'data', 'cart.json')

const getCartFileContent = () => {
  let content = { books: [], totalPrice: 0 }
  try {
    content = JSON.parse(fs.readFileSync(cartPath, 'utf8'))
  } catch(err) {
    console.error(`File reading error: ${err}`)
  }
  return content
}

const setCartFileContent = (content) => {
  try {
    fs.writeFileSync(cartPath, JSON.stringify(content))
  } catch(err) {
    console.error(`File writing error: ${err}`)
    return false
  }
  return true
}

class Cart {
  static addbook(id, bookPrice) {
    // console.log(`Add to Cart id: ${id}, book prive: ${bookPrice}`)
    // Fetch the previous cart
    const cart = getCartFileContent()
    // Analyze the cart => Find existing book
    const existingbookIndex = cart.books.findIndex( prod => prod.id === id )
    const existingbook = cart.books[existingbookIndex]
    let updatedbook
    // Add new book/ increase quantity
    if (existingbook) {
      updatedbook = { ...existingbook }
      updatedbook.qty = updatedbook.qty + 1
      cart.books[existingbookIndex] = updatedbook
    } else {
      updatedbook = { id: id, qty: 1 }
      cart.books = [...cart.books, updatedbook]
    }
    cart.totalPrice = cart.totalPrice + +bookPrice
    setCartFileContent(cart)
  }

  static deletebook(id, bookPrice) {
    const updatedCart = getCartFileContent()
    const book = updatedCart.books.find(prod => prod.id === id)
    if (!book) {
        return
    }
    const bookQty = book.qty
    updatedCart.books = updatedCart.books.filter( prod => prod.id !== id )
    updatedCart.totalPrice = updatedCart.totalPrice - bookPrice * bookQty

    setCartFileContent(updatedCart)
  }

  static getCart() {
      const cart = getCartFileContent()
      return cart
  }
}

export default Cart