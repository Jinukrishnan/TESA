import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../TodoContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
const Home = () => {
  const { todos, fetchTodos, loading } = useContext(TodoContext);
  const [filter, setFilter] = useState("all");

  const filteredTodos = filter === "all" ? todos : todos.filter((todo) => todo.status === filter);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/deletetodo/${id}`);
      console.log(res);

      if (res.status == 200) {
        // alert(res.data.message)
        toast.success(res.data.message, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        fetchTodos();
      }
    } catch (error) {
      console.log(error);

    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4 ">
        <h1 className="text-3xl font-semibold text-gray-800">Todo List</h1>
        <Link to="/add" className="inline-block py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-900">
          Add New Todo
        </Link>
      </div>


      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">Filter: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse bg-white shadow-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTodos.map((todo) => (
                <tr key={todo._id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-800">{todo.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{todo.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{todo.status}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">

                    <Link to={`/edit/${todo._id}`} className="text-blue-500 hover:text-blue-700 mr-4 cursor-pointer">
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;


const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return {textColor:"red"};
    case "in-progress":
      return   {textColor:"yellow"};
    case "completed":
      return  {textColor:"green"};
    default:
      return  {textColor:"grey"};
  }
};