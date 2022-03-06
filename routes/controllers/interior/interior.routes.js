const express = require('express')
const router = express.Router()
const InteriorController= require('./interior.controller')

/** FETCH  */
router.get('/',InteriorController.fetchInteriors)


/** POST */
router.post('/create-interior',InteriorController.createInterior)


module.exports=router