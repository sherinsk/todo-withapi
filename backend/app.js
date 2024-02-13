var express = require('express');
var mongoose = require('mongoose')
const bodyParser=require('body-parser')
const cors= require('cors')
const PORT=process.env.PORT || 8080;

mongoose.connect('mongodb+srv://sherinsk007:yNZGXhfhU0MJahvp@cluster0.1vvjouq.mongodb.net/?retryWrites=true&w=majority')

var app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())

todomodel=require('./models/todo.js')

app.get('/get',async (req,res)=>{
  todo= await todomodel.find({})
  res.json(todo)
})

app.post('/post', async (req,res)=>{
  todo_name=req.body.todo;
  status=req.body.status

  msg=new todomodel({todo:todo_name,status:status})
  msg.save()

  res.json({response:'Success'})
})

app.delete('/delete/:id', (req,res)=>{
  todomodel.deleteOne({_id:req.params.id}).then(()=>{res.json({deletion:"success"})}).catch((err)=>{console.log(err)})
})

app.put('/edit/:id',(req,res)=>{
  const updateFields={todo:req.body.todo}
  const query={_id:req.params.id}

  todomodel.updateOne(query,updateFields).then(()=>{res.json({edit:"SUCCESS"})}).catch((err)=>{console.log(err)})
})

app.get('/get/:id',async (req,res)=>{
  const x =req.params.id
  const todo= await todomodel.findById(x);
  todo.status=!todo.status
  await todo.save()
  res.json({status:"success"})
})

app.listen(PORT,()=>{
  console.log('server is running on port')
})
