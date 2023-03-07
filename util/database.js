const mongodb = require('mongodb')

const MonogClient = mongodb.MongoClient

let _db

const mongoConnect = (callback)=>{
  MonogClient.connect('mongodb+srv://harsha:<password>@cluster0.gmvyirq.mongodb.net/?retryWrites=true&w=majority')
.then(client=>{
  console.log('connected!')
  _db = client.db()
  callback()
})
.catch(err=>{
  console.log(err)
  throw err
})
}

const getDb = ()=>{
  if(_db){
    return _db
  }
  throw 'no database found'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb