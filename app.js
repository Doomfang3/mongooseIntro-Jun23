const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User.model')

mongoose
  .connect('mongodb://127.0.0.1:27017/mongooseIntro')
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => console.error('Error connecting to mongo', err))

const app = express()

app.get('/', async (request, response) => {
  // const users = await User.find({ username: 'B4n3l1ng' })
  const user = await User.findById('64a677948f017aab069460ac')
  console.log(user)
  response.json(user)
})

// Should be a POST
app.get('/newUser', async (request, response) => {
  // Simulating request.body for the example
  const body = {
    firstname: 'Antonio',
    lastname: 'Gloria',
    username: 'DrugLord',
    password: 'Movingisfun',
  }

  try {
    const newUser = await User.create(body)
    console.log(newUser)
    response.json(newUser)
  } catch (error) {
    console.log(error.code)
    if (error.code === 11000) {
      response.json({ message: 'Duplicate Key' })
    }
  }
})

// Should be a POST
app.get('/updateUser', async (request, response) => {
  // Simulating request.body for the example
  const body = {
    password: 'Movingissonotfun',
  }

  const updatedUser = await User.findByIdAndUpdate('64a679776be9ef61749b5e18', body, {
    new: true,
  })
  console.log(updatedUser)
  response.json(updatedUser)
})

// Should be a POST
app.get('/deleteUser', async (request, response) => {
  // Simulating param
  const userId = '64a679776be9ef61749b5e18'
  await User.findByIdAndDelete(userId)

  console.log(deletedUser)
  response.json(deletedUser)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
