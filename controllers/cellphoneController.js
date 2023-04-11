const mongoose = require('mongoose')
const { setup } = require('../models/mongoose.js')

module.exports = async function handler(req, res) { 
  mongoose.connect(process.env.MONGO_URL)
  setup(mongoose)
  const Cellphone = mongoose.model('cellphone')
  const { manufacturer, os, price } = req.body
  const newCellphone = new Cellphone({ manufacturer, os, price }) 
  await newCellphone.save()
  res.status(201).json({ manufacturer, os, price })
}