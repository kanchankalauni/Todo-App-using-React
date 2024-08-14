import { useEffect, useState } from "react"

function App() {

    const [allTodos, setAllTodos] = useState([])
    const [singleTodo, setSingleTodo] = useState({title : "", desc : ""})

    function handleAddTodo() {
        // setAllTodos(prevValue => [...prevValue, singleTodo])
        setAllTodos([...allTodos, singleTodo])
        saveTodoLocalStore([...allTodos, singleTodo])
    }

    function deleteTodo(i) {
        let newArr = [...allTodos]              //Method 2
        newArr.splice(i,1)
        setAllTodos(newArr)
    }

    function saveTodoLocalStore(todo) {
        localStorage.setItem("todos", JSON.stringify(todo))
    }

    function getTodoFromLocalStore() {
        let data = JSON.parse(localStorage.getItem("todos")) || []
        setAllTodos(data)
    }

    useEffect(() => {
        getTodoFromLocalStore()
    }, [])

    return (
        <>
            <div>
                <h1>Todo App</h1>
                <input type="text" placeholder="title" onChange={(e) => setSingleTodo(prevValue => ({...prevValue, title : e.target.value}))}/>
                <br />
                <br />
                <input type="text" placeholder="description" onChange={(e) => setSingleTodo(prevValue => ({...prevValue, desc : e.target.value}))}/>
                <br />
                <br />
                <button onClick={handleAddTodo}>Add Todo</button>
            </div>
            <div>
                {
                    allTodos.map((data, i) => (
                        <div key={i} style={{backgroundColor : "lightgray", padding : "20px", margin : "20px"}}>
                            <p>{i+1}</p>
                            <h1>{data.title}</h1>
                            <p>{data.desc}</p>
                            <button>Edit</button>
                            <button onClick={() => deleteTodo(i)}>Remove</button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default App
