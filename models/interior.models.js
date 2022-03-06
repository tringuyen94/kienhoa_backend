const mongoose = require('mongoose')

const InteriorSchema = new mongoose.Schema({
   nameRoom: { type: String, required: true },
})
const Interior = mongoose.model('Interior', InteriorSchema, 'Interior')
module.exports = Interior