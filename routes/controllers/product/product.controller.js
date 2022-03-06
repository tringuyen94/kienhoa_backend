const slugify = require("slugify")
const Product = require("../../../models/product.models")


/** FETCH API */


const fetchProducts = (req, res, next) => {
   Product.find()
      .populate('room')
      .populate('createdBy')
      .then(products => res.status(200).json(products))
      .catch(err => res.status(500).json(err))
}
const fetchProductByName = (req, res, next) => {
   const { nameProduct } = req.query
   Product.findOne({ nameProduct })
      .then(product => res.status(200).json(product))
      .catch(err => res.status(500).json(err))
}

/** POST API */

const createProduct = (req, res, next) => {
   const { nameProduct, room, detailProduct } = req.body
   const createdBy = req.user._id
   const imageProduct = req.file.path.substring(8)
   Product.findOne({ nameProduct })
      .then(product => {
         if (product) return Promise.reject({ status: 409, message: "Sản phẩm đã tồn tại rồi" })
         let _product = new Product({
            nameProduct, slugNameProduct: slugify(nameProduct).toLowerCase(),
            imageProduct, room, detailProduct, createdBy
         })
         return _product.save()
      })
      .then(newProd => res.status(201).json({ message: "Tạo sản phẩm thành công", newProd }))
      .catch(err => {
         if (err.status) return res.status(err.status).json(err.message)
         return res.status(500).json(err)
      })
}

/**  PUT API */
const updateProductById = (req, res, next) => {
   const { productId } = req.params
   const { nameProduct, detailProduct, room } = req.body
   Product.updateOne({ _id: productId }, { nameProduct, slugNameProduct: slugify(nameProduct).toLowerCase(), detailProduct, room })
      .then(updated => res.status(204).json(updated))
      .catch(err => res.status(500).json(err))
}
const updateImageProductById = (req, res, next) => {
   const { productId } = req.params
   const imageProduct = req.file.path.substring(8)
   Product.updateOne({ _id: productId }, { imageProduct })
      .then(updated => res.status(204).json(updated))
      .catch(err => res.status(500).json(err))
}

/** DELETE API */
const deleteProductById = (req, res, next) => {
   const { productId } = req.params
   Product.deleteOne({ _id: productId })
      .then(result => res.status(202).json({ result, message: "Đã xoá thành công" }))
      .catch(err => res.status(500).json(err))
}

module.exports = {
   createProduct, fetchProducts,
   fetchProductByName,
   deleteProductById,
   updateProductById, updateImageProductById
}