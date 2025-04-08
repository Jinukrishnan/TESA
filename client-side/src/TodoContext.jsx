import React ,{createContext,useState,useEffect} from 'react'
import axios from "axios";

export const TodoContext = createContext();

export const TodoProvider=({children})=>{
    const [todos,setTodos]=useState([]);
    const [loading,setLoading]=useState(false);
    const fetchTodos=async()=>{
        setLoading(true);
        try {
          const res = await axios.get("http://localhost:3000/api/gettodos");
          setTodos(res.data);
        } catch (err) {
          console.error("Error fetching todos:", err);
        }
        setLoading(false);
    }
    useEffect(()=>{
        fetchTodos();
    },[])
    return (
        <TodoContext.Provider value={{todos,setTodos,loading,fetchTodos}}>
            {children}
        </TodoContext.Provider>
    )
}