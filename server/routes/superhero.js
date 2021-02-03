var express = require('express');
var router = express.Router();

const Superhero = require('../models/Superhero');

/* List all superheroes. */
router.get('/', async (req, res, next) => {
  console.log('Getting superhero list...')
  console.log('The logged in user is', req.user)
  let data = await Superhero.find({});
  console.info(`records retrieved from mongoose:`, data?.length)
  res.send(data);
});

router.get('/:superheroid', async (req, res, next) => {
  let superheroid = req.params.superheroid
  console.info('We should be looking up superhero ', superheroid)  
  console.log('The logged in user is', req.user)

  try {
    let data = await Superhero.findById(superheroid);
    console.info('findById returned: ' + data);
    if (data === null) {
      throw new Error('Superhero not found')
    }
    res.send(data)
  }
  catch (error) {
    res.sendStatus(404)    
  }
});

router.post('/', async (req, res) => {
  let superheroData = req.body
  console.log('Editing a superhero...')
  console.log('The logged in user is', req.user)

  try {
    let createdSuperhero = await Superhero.create(superheroData)
    console.log(createdSuperhero)
    res.send(createdSuperhero)  
  }
  catch (error) {
    res.send(error)
  }
})

module.exports = router;
