const mongoose = require('mongoose')
const { setup } = require('../models/mongoose.js')

module.exports = async function handler(req, res) { 
  mongoose.connect(process.env.MONGO_URL)
  setup(mongoose)
  const Computer = mongoose.model('computer')
  const { manufacturer, os, price } = req.body
  const newComputer = new Computer({ manufacturer, os, price }) 
  await newComputer.save()
  res.status(201).json({ manufacturer, os, price })
}

module.post = async function(req,res) { 
  setup(mongoose)
  const comp = mongoose.model('computer')
  const { manufacturer, os, price } = req.body
  const newComp = new comp({ manufacturer, os, price })
  await comp.save()
  res.redirect('/computer')

}

