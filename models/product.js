const mongodb = require('mongodb')
const getDb = require('../util/database').getDb

class Product{
  constructor(title,price,description,imageURL,id,userId){
    this.title = title,
    this.price = price,
    this.description = description,
    this.imageURL = imageURL,
    this._id = id
    this.userId = userId
  }

  save(){
    const db = getDb()
    let dbOp
    if(this._id){
      // update product
      dbOp = db.collection('Product').updateOne({_id:new mongodb.ObjectId(this._id)},{$set : this})
    }else{
      dbOp = db.collection('Product').insertOne(this)
    }
    return dbOp
    // .then(result=>{
    //   console.log(result,'created at models-->product')
    // })
    // .catch(err=>{
    //   console.log(err,'happend at models-->product')
    // })
  }

  static fetchAll(){
    const db = getDb()
    return db.collection('Product')
    .find()
    .toArray()
    // .then(products=>{
    //   console.log(products)
    //   return products
    // })
    // .catch(err=>{
    //   console.log(err,'happened at models-->static fetch all')
    // })
  }

  static findById(prodId){
    const db = getDb()
    return db.collection('Product')
    .find({_id: new mongodb.ObjectId(prodId)})
    .next()
    // .then(item=>{
    //   console.log(item,'single item at models findById')
    //   return item
    // })
    // .catch(err=>{
    //   console.log(err,'static findByID at models')
    // })
  }

  static deleteById(prodId){
    const db = getDb()
    return db.collection("Product")
    .deleteOne({_id: new mongodb.ObjectId(prodId)})
    // .then(()=>{
    //   console.log('deleted successfully')
    // })
    // .catch(err=>{
    //   console.log(err)
    // })
  }
}

module.exports = Product;
