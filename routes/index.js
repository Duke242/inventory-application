const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const { setup } = require('../models/mongoose')
const controllers = {
  tv: require('../controllers/tvController'),
  computer: require('../controllers/computerController'),
  phone: require('../controllers/cellphoneController'),
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Electronics' });
});



router.get('/computer', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  setup(mongoose)
  const Computer = mongoose.model('computer')
  const computers = await Computer.find()
  res.render('newComputer', { title: 'Computers', computers}) 
})

router.get('/cellphone', async (req, res) => {
  setup(mongoose)
  const Cell = mongoose.model('cellphone')
  const cellphones = await Cell.find()
  res.render('newCellphone', { title: 'Cell Phones', cellphones})
})


router.post('/computer', async (req,res) => {
setup(mongoose)
const Comp = mongoose.model('computer')
const { manufacturer, os, price } = req.body
const newComp = new Comp({ manufacturer, os, price })
await newComp.save()
res.redirect('/computer')
})

router.post('/cellphone', async (req,res) => {
  setup(mongoose)
  const Cell = mongoose.model('cellphone')
  const { manufacturer, os, price } = req.body 
  const newCell = new Cell({ manufacturer, os, price }) 
  await newCell.save()
  res.redirect('/cellphone')
})


module.exports = router;
