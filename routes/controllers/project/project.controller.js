const Project = require('../../../models/project.models')
const slugify = require('slugify')
const Post = require('../../../models/post.models')


//FETCH API 

const fetchProjects = (req, res, next) => {
   Project.find()
      .then(projects => res.status(200).json(projects))
      .catch(err => res.status(500).json(err))
}
const fetchProjectBySlugName = (req, res, next) => {
   const { slugNameProject } = req.params
   Project.findOne({ slugNameProject })
      .then(project => res.status(200).json(project))
      .catch(err => res.status(500).json({ message: 'Thất bại', err }))
}
const fetchProjectByTag = (req, res, next) => {
   const { tagName } = req.query
   Project.find({ tagProject: tagName })
      .then(projects => res.status(200).json(projects))
      .catch(err => res.status(500).json({ message: "Thất bại", err }))
}
const fetchProjectByInCity = (req, res, next) => {
   const { inCity } = req.query
   Project.find({ inCity })
      .then(projects => res.status(200).json(projects))
      .catch(err => res.status(500).json({ message: 'Thất bại', err }))
}
const fetchProjectByTagDistrict= (req, res, next) => {
   const { tagDistrict } = req.query
   Project.find({ tagDistrict })
      .then(projects => res.status(200).json(projects))
      .catch(err => res.status(500).json({ message: "Thất bại", err }))
}
//POST API
const createProject = (req, res, next) => {
   const { nameProject, nameArchitect, address,
      inCity, tagDistrict, tagProject } = req.body
   let temp = req.files
   const projectImages = temp.map(item => item.path.substring(8))
   const slugNameProject = slugify(nameProject).toLowerCase()
   Project.findOne({ slugNameProject }).then(project => {
      if (project) return Promise.reject({ status: 409, message: "Tiêu đề bài viết đã tồn tại" })
      const _project = new Project({
         nameProject, slugNameProject, inCity,
         nameArchitect, address, tagDistrict,
         projectImages, tagProject
      })
      return _project.save()
   })
      .then(newProject => res.status(201).json({ message: "Tạo dự án thành công", newProject }))
      .catch(err => {
         if (err.status) return res.status(err.status).json({ message: err.message })
         res.status(500).json({ err, message: "Thất bại" })
      })
}
//PUT API 
const updateProjectById = (req, res, next) => {
   const { projectId } = req.params
   const { nameProject, nameArchitect, address, inCity, tagDistrict, tagProject } = req.bodys
   const slugNameProject = slugify(nameProject).toLowerCase()
   Project.updateOne({ _id: projectId }, {
      nameProject, slugNameProject
      , nameArchitect, address, inCity, tagDistrict, tagProject
   })
      .then(updated => res.status(204).json({ mesasge: "Cập nhật thành côngh", updated }))
      .catch(err => res.status(500).json({ mesasge: "Cập nhật thất bại", err }))
}
const updateImageProjectById = (req, res, next) => {
   const { projectId } = req.params
   const projectImages = req.files.map(path => path.substring(8))
   Post.updateOne({ _id: projectId }, { projectImages })
      .then(updated => res.status(204).json({ message: "Cập nhật ảnh thành công", updated }))
      .catch(err => res.status(500).json({ message: "Cập nhật thất bại", err }))
}
//DELETE API
const deleteProjectById = (req, res, next) => {
   const { projectId } = req.params
   Project.deleteOne({ _id: projectId })
      .then(result => res.status(202).json({ result, message: "Đã xoá" }))
      .catch(err => res.status(500).json({ err, message: "Xoá thất bái" }))
}

module.exports = {
   createProject, fetchProjects,
   deleteProjectById, fetchProjectBySlugName, updateProjectById,
   updateImageProjectById, fetchProjectByTag, fetchProjectByInCity,
   fetchProjectByTagDistrict
}