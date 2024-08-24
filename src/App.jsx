import { useEffect, useState } from "react"

function App() {

    const [isEditing, setIsEditing] = useState(false)
    const [updatedIndex, setUpdatedIndex] = useState(null)
    const [allTodos, setAllTodos] = useState([])
    const [singleTodo, setSingleTodo] = useState({title : "", desc : ""})

    function handleAddTodo() {
        // setAllTodos(prevValue => [...prevValue, singleTodo])
        if (!singleTodo.title || !singleTodo.desc) {
            return
        }
        
        if (isEditing) {
            const updatedTodo = allTodos.map((todo,i) => updatedIndex == i ? singleTodo : todo)
            setAllTodos([...updatedTodo])
            saveTodoLocalStore([...updatedTodo])
            setIsEditing(false)
            setUpdatedIndex(null)
        } else {
            setAllTodos([...allTodos, singleTodo])
            saveTodoLocalStore([...allTodos, singleTodo])
        }
        setSingleTodo({title : "", desc : ""})
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
        <div className="bg-lime-200 max-w-screen min-h-screen text-center">
            <h1 className="text-5xl pt-12">Todo App</h1>
            <div className="mt-10">
                <input className="text-2xl px-4 py-2 focus:outline-none capitalize rounded-md" type="text" value={singleTodo.title} placeholder="title" onChange={(e) => setSingleTodo(prevValue => ({...prevValue, title : e.target.value}))}/>
                <br />
                <br />
                <input className="text-2xl px-4 py-2 focus:outline-none capitalize rounded-md" type="text" value={singleTodo.desc} placeholder="description" onChange={(e) => setSingleTodo(prevValue => ({...prevValue, desc : e.target.value}))}/>
                <br />
                <br />
                <button className="text-2xl bg-blue-600 text-white py-2 px-[6.3rem] rounded-md" onClick={handleAddTodo}>{isEditing ? "Update Todo" : "Add Todo"}</button>
            </div>
            <div className="w-[100%] sm:w-[70%] md:w-[60%] lg:w-[55%] mx-auto py-10">
                {
                    allTodos.map((data, i) => (
                        <div key={i} className="bg-purple-500/20 m-4 p-6 flex flex-col justify-between items-start gap-1 rounded-lg">
                            <div className="flex flex-col sm:flex-row justify-between w-full">
                                <div className="flex gap-6 w-[70%]">
                                    <p className="text-4xl">{i+1}.</p>
                                    <div className="flex flex-col items-start gap-1">
                                        <h1 className="capitalize text-4xl font-medium">{data.title}</h1>
                                        
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <button className="text-2xl bg-green-600 text-white px-6 py-2 rounded-md" onClick={() => editTodo(i)}><i class="fi fi-sr-pen-circle"></i></button>
                                    <button className="text-2xl bg-red-600 text-white px-6 py-2 rounded-md" onClick={() => deleteTodo(i)}><i class="fi fi-rs-trash"></i></button>
                                </div>
                            </div>
                            <p className="max-w-full text-wrap text-xl text-gray-700/65 break-words line-clamp-3">{data.desc}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default App
