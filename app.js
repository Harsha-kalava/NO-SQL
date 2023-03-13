const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose')
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('640ec65d2f71b50b8cd3e92c')
    .then(user => {
      req.user = user
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://harsha:<password>@cluster0.gmvyirq.mongodb.net/?retryWrites=true&w=majority')
.then(res=>{
  User.findOne()
  .then(user=>{
    if(!user){
      const user = new User({
        name:'Harsha',
        email:'harsha@gmail.com',
        cart :{
          items:[]
        }
      })
      user.save()
    }
  })
  console.log('connected!!')
  app.listen(3000)
})
.catch(err=>{
  console.log(err)
})
