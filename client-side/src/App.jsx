import React from 'react'
import Home from './pages/Home'
import AddTodo from './pages/AddTodo'
import EditTodo from './pages/EditTodo'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TodoProvider } from './TodoContext'
const App = () => {
  return (
    <TodoProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTodo />} />
        <Route path="/edit/:id" element={<EditTodo />} />
      </Routes>
    </Router>
  </TodoProvider>
  )
}

export default App
