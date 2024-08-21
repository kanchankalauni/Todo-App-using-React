import { useEffect, useState } from "react"

function App() {

    const [isEditing, setIsEditing] = useState(false)
    const [updatedIndex, setUpdatedIndex] = useState(null)
    const [allTodos, setAllTodos] = useState([])
    const [singleTodo, setSingleTodo] = useState({title : "", desc : ""})

    function handleAddTodo() {
        // setAllTodos(prevValue => [...prevValue, singleTodo])
        if (isEditing) {
            const updatedTodo = allTodos.map((todo,i) => updatedIndex == i ? singleTodo : todo)
            setAllTodos([...updatedTodo])
            saveTodoLocalStore([...updatedTodo])
            isEditing(false)
            setUpdatedIndex(null)
        } else {
            setAllTodos([...allTodos, singleTodo])
            saveTodoLocalStore([...allTodos, singleTodo])
        }
    }

    function deleteTodo(i) {
        let newArr = [...allTodos]              //Delete todo from UI
        newArr.splice(i,1)
        saveTodoLocalStore(newArr)              //Updated, Delete todo to Local Storage(Mothod 1)
        setAllTodos(newArr)

        // allTodos.splice(i,1)                 //Delete todo from Local Storage(Methoda 2)
        // saveTodoLocalStore(allTodos)
        // getTodoFromLocalStore()
    }

    function editTodo(i) {
        setSingleTodo(allTodos[i])
        setIsEditing(true)
        setUpdatedIndex(i)
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
                <input type="text" value={singleTodo.title} placeholder="title" onChange={(e) => setSingleTodo(prevValue => ({...prevValue, title : e.target.value}))}/>
                <br />
                <br />
                <input type="text" value={singleTodo.desc} placeholder="description" onChange={(e) => setSingleTodo(prevValue => ({...prevValue, desc : e.target.value}))}/>
                <br />
                <br />
                <button onClick={handleAddTodo}>{isEditing ? "Update Todo" : "Add Todo"}</button>
            </div>
            <div>
                {
                    allTodos.map((data, i) => (
                        <div key={i} style={{backgroundColor : "lightgray", padding : "20px", margin : "20px"}}>
                            <p>{i+1}</p>
                            <h1>{data.title}</h1>
                            <p>{data.desc}</p>
                            <button onClick={() => editTodo(i)}>Edit</button>
                            <button onClick={() => deleteTodo(i)}>Remove</button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default App
