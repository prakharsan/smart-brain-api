const express = require('express');
// const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db =knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : '5433',
    user : 'postgres',
    password : 'prakhar3099',
    database : 'smart-brain'
  }
});

// postgres.select('*').from('users').then( data =>{
//     console.log(data);
// })
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send('success')})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3002, ()=> {
    console.log('listening on port 3002')
})
