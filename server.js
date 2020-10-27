const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host:'127.0.0.1',
    user:'radsaskara',
    password:'',
    database:'smartbrain'
  }
})

const app = express();
app.use(bodyParser.json());
app.use(cors())



const database = {
  users: [
    {
      id: '123',
      name: 'Rad',
      email: 'rad@rad.com',
      password: 'radit',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Kiara',
      email: 'kiara@kiara.com',
      password: 'kiara',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id : '679',
      hash: '',
      email: 'rad@rad.com'
    }
  ]
}

app.get('/',(req,res)=> {res.send(database.users)})

app.post('/signin', signin.handleSignin(db,bcrypt))

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})

app.put('/image',(req,res)=> {image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=> {image.handleAPI(req,res)})

app.listen(3000,()=> console.log('Im Listening'));



//  '/'  -> this is working
//  '/signin' -> POST = success/fail
//  '/register' -> POST = new user Object
//  '/profile/:userId' -> GET = user
//  '/image -> PUT = user