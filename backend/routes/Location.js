const express = require('express');
const router = express.Router();
const { Location, upload } = require('../models/Locations'); 


router.post('/add', upload.single('picture'), async (req, res) => {
  try {
    const newLocation = new Location({
      name: req.body.name,
      city: req.body.city,
      description: req.body.description,
      picture: req.file ? req.file.path : null, 
    });

    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
    try {
      const locations = await Location.find();
      res.status(200).json(locations);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put('/update/:id', upload.single('picture'), async (req, res) => {
    try {
      const locationId = req.params.id;
      const { name, city, description } = req.body;
      const updatedFields = {
        name,
        city,
        description,
        picture: req.file ? req.file.path : null, 
      };
  

      const updatedLocation = await Location.findByIdAndUpdate(locationId, updatedFields, { new: true });
  
      if (!updatedLocation) {
        return res.status(404).json({ error: 'Location not found' });
      }
  
      res.status(200).json(updatedLocation);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  router.delete('/delete/:id', async (req, res) => {
    try {
      const locationId = req.params.id;
  
      const deletedLocation = await Location.findByIdAndDelete(locationId);
  
      if (!deletedLocation) {
        return res.status(404).json({ error: 'Location not found' });
      }
  
      res.status(200).json({ message: 'Location deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
module.exports = router;
