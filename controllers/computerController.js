const mongoose = require('mongoose')
const { setup } = require('../models/mongoose.js')

module.exports = 
{
  get : async (req, res) => { 
      mongoose.connect(process.env.MONGO_URL)
      setup(mongoose)
      const Computer = mongoose.model('computer')
      if (req.params.id != null) {
        const computer = await Computer.findOne({ _id: req.params.id})
        res.render(
          'computers/index',
          { title: `${computer.manufacturer} ${computer.os}`, computer }
        )} else {
          const computers = await Computer.find()
          res.render('computers/index', { title: 'Computers' , computers })
        }
      },
  post: async (req, res) => { 
        setup(mongoose)
        const Comp = mongoose.model('computer')
        const { manufacturer, os, price } = req.body
        const newComp = new Comp({ manufacturer, os, price })
        await newComp.save()
        res.redirect('/computers')
    },
  patch: async (req, res) => {
    setup(mongoose)
    const Comp = mongoose.model('computer')
    const options = { overwrite: true }
    const query = { _id: req.params.id }
    await Comp.findOneAndUpdate(query, req.body, options)
    res.redirect('/computers')
  },
  delete: async (req, res) => {
    setup(mongoose)
    const Comp = mongoose.model('computer')
    await Comp.findByIdAndRemove(req.params.id)
    res.redirect('/computers')
  }
  
}


