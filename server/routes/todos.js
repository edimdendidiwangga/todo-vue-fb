const router = require('express').Router();
const todoController = require('../controllers/todos')
let helper = require('../helpers/verify_token')

router.get('/', helper.auth, todoController.getAll)
// router.get('/:id', helper.auth, todoController.getById)
router.post('/', helper.auth, todoController.insertOne)
router.post('/:id', helper.auth, todoController.updateById)
router.delete('/:id', helper.auth, todoController.deleteById)

module.exports = router;
