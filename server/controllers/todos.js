const Todo = require('../models/todos')
const methods = {}

methods.insertOne = function(req, res){
	let user_id = req.decoded._id;
  Todo.create({
    task : req.body.task,
    is_completed : req.body.is_completed,
		reminder : req.body.reminder,
    user_id : user_id
  }, function(error, record){
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.getAll = function(req, res){
	let user_id = req.decoded._id;
  Todo.find({user_id : user_id})
    .populate('user_id')
    .exec((error, records)=>{
    if(error){
      res.json({error})
    } else {
      res.json(records)
    }
  })
}

methods.getById = function(req, res){
  Todo.findById(req.params.id, function(error, record){
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.updateById = function(req, res){
	let id_user = req.decoded._id;
  Todo.findByIdAndUpdate(req.params.id,
    { $set:
      {
        task : req.body.task,
        is_completed : req.body.is_completed,
				reminder : req.body.reminder,
				user_id : id_user
      }
    }, {new: true})
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.deleteById = function(req, res){
  Todo.findByIdAndRemove(req.params.id)
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}


module.exports = methods
