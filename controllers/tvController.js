
const mongoose = require('mongoose')
const { patch } = require('../app.js')
const { setup } = require('../models/mongoose.js')


module.exports = {
  get: async (req, res) => {
    setup(mongoose)
    const TV = mongoose.model('tv')
    const tvs = await TV.find()
    res.render('newTV', { title: 'TVs', tvs })
  },
  post: async (req, res) =>  { 
    setup(mongoose)
    const TV = mongoose.model('tv')
    const { size, manufacturer, price } = req.body
    console.log({ size, manufacturer, price })
    const newTV = new TV({ size, manufacturer, price }) 
    await newTV.save()
    res.redirect('/tv')
  }, 
  patch: ("/:id", async (req, res) =>  { 
    setup(mongoose)
    const TV = mongoose.model('tv')
    const options = { overwrite: true }
    const query = { _id: ObjectId(req.params.id) }
    const { size, manufacturer, price } = req.body
    const updatedInfo = await TV.findOneAndUpdate(query, { size, manufacturer, price }, options)
  }),
  delete: async (req, res) =>  { 
    setup(mongoose)
  },
}

// router.put("/:id", async (req, res) => {
//   const query = { _id: ObjectId(req.params.id) };
//   const options = { overwrite: true };
//   const updates = req.body;
//   let collection = await db.collection("posts");
//   let result = await collection.findOneAndUpdate(query, updates, options);
//   res.send(result).status(200);
// });






