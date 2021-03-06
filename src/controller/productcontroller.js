const db = require('../models')
const Product = db.product

exports.index = (req, res) => {
    Product.findAll({
        where: {
            user_id: req.userId
        }
    }).then((result) => {
        res.status(200).json({
          data: result,
          message: 'show all products successfully',
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        })
      })
}

exports.create = (req, res) => {
    if (!req.body.name) {
      res.status(400).json({
        message: 'name must be required',
      })
      return
    } else if (!req.body.quantity) {
        res.status(400).json({
            message: 'quantity must be required',
        })
    } else if(!req.body.quantity) {
        res.status(400).json({
            message: 'quantity must be required',
        })
    }
  
    const product = {
      user_id: req.userId,
      ...req.body,
    }
  
    Product.create(product)
      .then((result) => {
        res.status(201).json({
          data: result,
          message: 'product created successfully',
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        })
      })
  }

  exports.show = (req, res) => {
      const id = req.params.id

      Product.findByPk(id).then((result) => {
          if(result.user_id != req.userId) {
              res.status(401).json({
                  message: 'unauthorized data product',
              })
              return
          }
          res.status(200).json({
              data: result,
              message: 'show product successfully'
          })
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        })
      })
  }

  exports.update = (req, res) => {
    const id = req.params.id

    Product.findByPk(id).then((result) => {
        if(result.user_id != req.userId) {
            res.status(401).json({
                message: 'unauthorized data product',
            })
            return
        }
        
        Product.update(req.body, {
            where: {
                id: id
            }
        }).then((num) => {
            if(num = 1) {
                res.status(200).json({
                    message: 'product updated successfully'
                })
            } else {
                res.status(404).json({
                    message: `cannot update product `
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
              message: err.message,
            })
          })
    })
    .catch((err) => {
        res.status(500).json({
          message: err.message,
      })
 })
}

exports.delete = (req, res) => {
    const id = req.params.id
  
    Product.findByPk(id)
      .then((result) => {
        if (result.user_id != req.userId) {
          res.status(401).json({
            message: 'unauthorized data product',
          })
          return
        }
  
        Product.destroy({
          where: {
            id: id,
          },
        })
          .then((num) => {
            if (num == 1) {
              res.status(200).json({
                message: 'product deleted successfully',
              })
            } else {
              res.status(404).json({
                message: `cannot delete product with id ${id}`,
              })
            }
          })
          .catch((err) => {
            res.status(500).json({
              message: err.message,
            })
          })
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        })
      })
  }