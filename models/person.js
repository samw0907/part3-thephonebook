const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)

  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneNumberValidator = (value) => {
  const regex = /^\d{2,3}-\d+$/
  return regex.test(value)

}

const personSchema = new mongoose.Schema({
  name: { type: String,
    minLength: 3,
    required: true
  },
  number: { type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: phoneNumberValidator,
      message: 'Phone number must be in the format xx(x)-xxxxxxx'
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)