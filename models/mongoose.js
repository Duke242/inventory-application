import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URL)

export default mongoose

export const setup = (mongoose) => {
  const TVSchema = new mongoose.Schema({
    size : { type: String, required: true },
    manufacturer : { type: String, required: true },
    price : { type: Number, required: true },
  })

  const cellPhonesSchema = new mongoose.Schema({
    manufacturer : { type: String, required: true },
    operatingSystem : { type: String, required: true },
    price : { type: Number, required: true },
  })

  const computersSchema = new mongoose.Schema({
    manufacturer : { type: String, required: true },
    operatingSystem : { type: String, required: true },
    price : { type: Number, required: true },
  })


  const TVs = mongoose.model('TVs', TVSchema)
  const cellPhones = mongoose.model('cellPhones', cellPhonesSchema)
  const computers = mongoose.model('computers', computersSchema)
}