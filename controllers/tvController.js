
const mongoose = require('mongoose')
const { patch } = require('../app.js')
const { setup } = require('../models/mongoose.js')


module.exports = {
  get: async (req, res) => {
    setup(mongoose)
    const TV = mongoose.model('tv')
    if (req.params.id != null) {
      const tv = await TV.findOne({ _id: req.params.id })
      res.render(
        'tvs/index',
        { title: `${tv.size}” ${tv.manufacturer}`, tv, method: 'PATCH' }
      )
    } else {
      const tvs = await TV.find()
      res.render(
        'tvs/index',
        { title: 'TVs', tvs, method: 'POST' }
      )
    }
    
  },
  post: async (req, res) =>  { 
    setup(mongoose)
    const TV = mongoose.model('tv')
    const { size, manufacturer, price } = req.body
    console.log({ size, manufacturer, price })
    const newTV = new TV({ size, manufacturer, price }) 
    await newTV.save()
    res.redirect('/tvs')
  }, 
  patch: async (req, res) =>  { 
    console.log('PATCH WORKS')
    setup(mongoose)
    const TV = mongoose.model('tv')
    const options = { overwrite: true }
    const query = { _id: req.params.id }
    await TV.findOneAndUpdate(query, req.body, options)
    res.redirect('/tvs')
  },
  delete: async (req, res) =>  { 
    setup(mongoose)
    const TV = mongoose.model('tv')
    await TV.findByIdAndRemove(req.params.id)
    res.redirect('/tvs')
  },
}








