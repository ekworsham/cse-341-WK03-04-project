const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  //#swagger.tags-['Hello World']
  res.send('Hello KEITH');
});

router.use('/trees', require('./trees'));
router.use('/shrubs', require('./shrubs'));

module.exports = router;