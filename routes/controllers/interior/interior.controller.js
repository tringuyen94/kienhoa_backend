const Interior = require('../../../models/interior.models')

/** FETCH API */
const fetchInteriors = (req, res, next) => {
   Interior.find()
      .then(interiors => res.status(200).json(interiors))
      .catch(err => res.status(500).json(err))
}

/** POST API */
const createInterior = (req, res, next) => {
   const { nameRoom } = req.body
   let newInterior = new Interior({ nameRoom })
   return newInterior.save()
      .then(_interior => res.status(201).json(_interior))
      .catch(err => res.status(500).json({ mesasge: 'Thất bại', err }))
}

module.exports = { fetchInteriors, createInterior }