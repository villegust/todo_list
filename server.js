const express = require("express");
const cors = require("cors")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const API_PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/getTodos", async (req, res) => {
    const getTodos = await prisma.todos.findMany();
    res.json(getTodos);
})

app.post("/createTodo", async (req, res) => {
    const createTodo = await prisma.todos.create({data: req.body})
    res.json(createTodo)
})

app.put("/updateTodos/:id", async (req, res) => {
    const id = req.params.id;
    const newTodo = req.body.todos;
    const updatedTodos = await prisma.todos.update({
        where: {id: String(id)},
        data: {todos: newTodo}
    })
    res.json(updatedTodos)
})

app.delete("/deleteTodos/:id", async (req, res) => {
    const id = req.params.id;
    const deleteTodos = await prisma.todos.delete({
        where: {id: String(id)},
    })
    res.json(deleteTodos)
})

app.listen(API_PORT, () => console.log(`Lisening to port ${API_PORT}`));