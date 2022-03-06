const express = require('express')
const ProjectController = require('./project.controller')
const uploadImage = require('../../../middlewares/upload.middlewares')
const { authentication } = require('../../../middlewares/auth.middlewares')
const router = express.Router()


//FETCH ROUTE
router.get('/fetch-projects', ProjectController.fetchProjects)
router.get('/fetch-project-by-slug-name-project/:slugNameProject', ProjectController.fetchProjectBySlugName)
router.get('/fetch-projects-by-tag',ProjectController.fetchProjectByTag)
router.get('/fetch-projects-by-in-city',ProjectController.fetchProjectByInCity)
router.get('/fetch-projects-by-tag-district',ProjectController.fetchProjectByTagDistrict)
//POST ROUTE
router.post('/create-project', authentication, uploadImage('projectImages'), ProjectController.createProject)

//PUT ROUTE
router.put('/update-project-by-id/:projectId', authentication, ProjectController.updateProjectById)
router.put('/update-project-images-by-id/:projectId', authentication, ProjectController.updateImageProjectById)
//DELETE ROUTE
router.delete('/delete-project-by-id/:projectId', authentication, ProjectController.deleteProjectById)


module.exports = router