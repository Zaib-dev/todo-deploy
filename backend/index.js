const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { PrismaClient } = require ('@prisma/client')
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());


app.use(bodyParser.json());

const prisma = new PrismaClient()


// Define a route that returns a simple message
app.get('/', (req, res) => {
    res.send('Hello, this is your Node.js backend server!');
});

// GET /api/todos to fetch all todos.

app.get('/api/todos', async (req, res) => {
    const allTodos = await prisma.todo.findMany()
    res.json({allTodos} );
});

// POST /api/todos to add a new todo.
app.post('/api/todos', async (req, res) => {
    const todo = await prisma.todo.create({
        data : {
            title: req.body.title,
        }
    })
    res.send(todo);
});
// PUT /api/todos/:id to update an existing todo.
app.put('/api/todos/:id', async (req, res) => {
    const todoId = await parseInt(req.params.id);
    const checkedTodo = await prisma.todo.findFirst({
        where: { id: todoId },
    })
    currentDone = checkedTodo.done;
    oppCurrentDone = !currentDone

    const updatedTodo = await prisma.todo.update({
        where: { id: todoId},
        data: {
          done:  oppCurrentDone
        }
      })
    res.send(updatedTodo);
});
// DELETE /api/todos/:id to delete a todo.
app.delete('/api/todos/:id', async (req, res) => {
    const todoId = await parseInt(req.params.id);
    const deletedTodo = await prisma.todo.delete({
        where: { id: todoId}
      })
    res.send(deletedTodo);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



