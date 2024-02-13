var mongoose=require('mongoose')

schema= new mongoose.Schema({todo:String,status:Boolean})

module.exports=mongoose.model('todo-list',schema)