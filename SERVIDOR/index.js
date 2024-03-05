const express = require("express");
const app = express();
const cors = require("cors");
const pool = require ("./db"); 
const port=4000;
//middleware
app.use(cors());
app.use(express.json());


//ROUTES//


//create a todo

app.post("/todos", async(req, res) =>{
    try {
        const {description}= req.body;
        const newTodo = await pool.query (
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

//get all todos
app.post ("/todos/obtener", async(req, res) => {

    try {
        const {nombre_tabla} = req.body;
        const allTodos = await pool.query
        ('SELECT * FROM obtenerTodosLosDatos($1)AS (col1 integer, col2 VARCHAR)', [nombre_tabla]);
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message);
    }
});

app.get ("/todos/obtener/facil", async(req, res) => {

    try {
        const allTodos = await pool.query
        ('SELECT * FROM todo');
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message);
    }
});


//get a todo 

app.get("/todos/:id", async (req, res) =>{

    try {
        const {id} = req.params;
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
        res.json(todo.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//update a todo

app.put("/todos/:id", async(req, res) =>{

    try {
        
    } catch (error) {
        console.error(error.message);
    }
});


//delete a todo


app.listen(port, () => {
  console.log(' listening on port ${port}! http://localhost:${port}/');
})
