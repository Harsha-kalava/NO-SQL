const getDb = require('../util/database').getDb

class Product{
  constructor(title,price,description,imageURL){
    this.title = title,
    this.price = price,
    this.description = description,
    this.imageURL = imageURL
  }

  save(){
    const db = getDb()
    return db.collection('Product')
    .insertOne(this)
    .then(result=>{
      console.log(result,'created at models-->product')
    })
    .catch(err=>{
      console.log(err,'happend at models-->product')
    })
  }
}

module.exports = Product;
