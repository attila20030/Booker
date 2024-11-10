import fs from 'fs'
import path from 'path'

import __dirname from '../util/rootpath.js'
import Cart from './cart.js'

const boosPath = path.join(__dirname, 'data', 'books.json')

const getbooksFileContent = () => {
  let content = []
  try {
    content = JSON.parse(fs.readFileSync(prodsPath, 'utf8'))
  } catch(err) {
    console.error(`File reading error: ${err}`)
  }
  return content
}

const setbooksFileContent = (content) => {
  try {
    fs.writeFileSync(prodsPath, JSON.stringify(content))
  } catch(err) {
    console.error(`File writing error: ${err}`)
    return false
  }
  return true
}

class book {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    const books = getbooksFileContent()
    if (this.id) {
      const existingbookIndex = books.findIndex(prod => prod.id === this.id)
      books[existingbookIndex] = this
      setbooksFileContent(books)
    } else {
      this.id = Math.random().toString()
      books.push(this)
      setbooksFileContent(books)
    }
  }

  static deleteById(id) {
    const books = getbooksFileContent()
    const book = books.find(prod => prod.id === id)
    const updatedbooks = books.filter(prod => prod.id !== id)
    const isDeleted = setbooksFileContent(updatedbooks)
    if (isDeleted) {
      Cart.deletebook(id, book.price)
    }
  }

  static fetchAll() {
    const books = getbooksFileContent()
    return books
  }

  static findById(id) {
    const books = getbooksFileContent()
    const book = books.find(prod => prod.id === id)
    return book
  }
}

export default book