const mongoose = require('mongoose')
const { setup } = require('../models/mongoose.js')

module.exports = 
{
  get : async (req, res) => { 
      setup(mongoose)
      const Cellphone = mongoose.model('cellphone')
      if (req.params.id != null) {
        const cellphone = await Cellphone.findOne({ _id: req.params.id })
        res.render(
          'cellphones/index',{ title: `${cellphone.manufacturer} ${cellphone.os}`, cellphone})
        } else {
            const cellphones = await Cellphone.find()
            res.render('cellphones/index', { title: 'Cellphones', cellphones })
        }
      },
  post: async (req, res) => { 
        setup(mongoose)
        const Cell = mongoose.model('cellphone')
        const { manufacturer, os, price } = req.body
        const newCell = new Cell({ manufacturer, os, price })
        await newCell.save()
        res.redirect('/cellphones')
    },
  patch: async (req, res) => {
    setup(mongoose)
    const Cell = mongoose.model('cellphone')
    const query = { _id: req.params.id }
    await Cell.findOneAndUpdate(query, req.body, options)
    res.redirect('/cellphones')
  },
  delete: async (req, res) => {
    setup(mongoose)
    const Cell = mongoose.model('cellphone')
    await Cell.findByIdAndRemove(req.params.id)
    res.redirect('/cellphones')
  }
  
}