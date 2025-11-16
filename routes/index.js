const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  //#swagger.tags-['Helllo World']
  res.send('Hello World');
});

router.use('/collectionController', require('./collectionController'));

module.exports = router;
