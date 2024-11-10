import Books from '../models/books.js'

export const getAddBooks = (req, res, next) => {
  res.render('admin/edit.ejs', {
    pageTitle: 'Add Books',
    path: '/view/admin/books.ejs',
    editing: false
  })
}

export const postAddBooks = (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl || "https://s01.static.libri.hu/cover/fe/2/3130710_4.jpg"
  const price = req.body.price
  const description = req.body.description
  const product = new Books(null, title, imageUrl, description, price)
  product.save()
  res.redirect('/')
}

export const getEditBooks = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  const product = Books.findById(prodId)
  if (!product) {
    return res.redirect('/')
  }
  res.render('admin/edit', {
    pageTitle: 'Edit Product',
    path: '/admin/edit',
    editing: editMode,
    product: product
  })
}

export const postEdit = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedImageUrl = req.body.imageUrl
  const updatedDesc = req.body.description
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice)
  updatedProduct.save()
  res.redirect('/admin/books')
}

export const getBooks= (req, res, next) => {
  const products = Product.fetchAll()
    res.render('admin/books', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/books'
    })
}

export const postDeleteBook = (req, res, next) => {
  const prodId = req.body.productId
  Product.deleteById(prodId)
  res.redirect('/admin/books')
}