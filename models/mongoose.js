
module.exports = { setup: (mongoose) => {
  mongoose.connect(process.env.MONGO_URL)

  const tvSchema = new mongoose.Schema({
    size: { type: String, required: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
  })

  const cellphoneSchema = new mongoose.Schema({
    manufacturer: { type: String, required: true },
    os: { type: String, required: true },
    price: { type: Number, required: true },
  })

  const computerSchema = new mongoose.Schema({
    manufacturer: { type: String, required: true },
    os: { type: String, required: true },
    price: { type: Number, required: true },
  })
  try { mongoose.model('tv', tvSchema) } catch(e) {}
  try { mongoose.model('cellphone', cellphoneSchema) } catch(e) {}
  try { mongoose.model('computer', computerSchema) } catch(e) {}

} }
 