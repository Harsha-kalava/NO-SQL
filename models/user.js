
const mongodb = require('mongodb')
const getDb = require('../util/database').getDb

const ObjectId = mongodb.ObjectId

class User{
  constructor(userName,email){
    this.name = userName
    this.email = email
  }

  save(){
    const db = getDb()
    return db.collection('users').insertOne(this)
    // .then(user=>{
    //   console.log(user,'user created')
    // })
    // .catch(err=>{
    //   console.log(err,'err happened here')
    // })

  }

  static findById(userId){
    const db = getDb()
    return db.collection('users').findOne({_id:new ObjectId(userId)})
    // .then(user=>{
    //   console.log(user,'<--- user')
    //   return user
    // })
    // .catch(err=>{
    //   console.log(err)
    // })
  }
}

module.exports = User