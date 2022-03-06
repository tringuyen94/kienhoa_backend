const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
   nameProject: { type: String, required: true },
   slugNameProject: { type: String, required: true },
   nameArchitect: { type: String, required: true },
   projectImages: [String],
   address: { type: String, required: true },
   inCity: { type: Boolean, required: true },
   tagDistrict: { type: String },
   tagProject: { type: String, enum: ["Biệt thự", "Nhà phố", "Căn hộ", "Các hạng mục khác"], required: true }
}, { timestamps: true })
const Project = mongoose.model('Project', ProjectSchema, "Project")

module.exports = Project