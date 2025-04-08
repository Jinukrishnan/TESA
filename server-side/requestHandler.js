 import todoSchema from "./models/todo.model.js";
export async function addTodo(req, res) {
    try {
        const { title, description, status } = req.body;
        if (!(title, description, status))
            return res.status(403).json({ error: "All fields are required" });
        const newTodo = await todoSchema.create({ title, description, status });
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
export async function getTodos(req, res) {
    try {
        const todos = await todoSchema.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
export async function deleteTodo(req, res) {
    try {
        const { id } = req.params;
        const deleted=await todoSchema.findByIdAndDelete(id);
        if (!deleted) 
            return res.status(404).json({ error: "Todo not found" });
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
export async function  getTodoById(req,res){
    try {
        console.log("hello");
        const{_id}=req.params
        
        const todo = await todoSchema.findOne({_id});
        if (!todo) 
            return res.status(404).json({ error: "Todo not found" });
        res.status(200).json(todo);
      } catch {
        res.status(500).json({ error: "Error fetching todo" });
      }
}

export async function updateTodo(req, res) {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        if (!(title, description, status))
            return res.status(400).json({ error: "All fields are required" });
        const updated = await todoSchema.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true }
        );
        if (!updated)
            return res.status(404).json({ error: "Todo not found" });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}