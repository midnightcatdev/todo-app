import React, {useState, useEffect} from "react";
import './App.css';
//Import componenents
import Form from "./Components/Form";
import TodoList from "./Components/TodoList";

function App() {

    //state things
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([]);

    //use effect
    useEffect(() => {
        getLocalTodos()
    }, [])

    useEffect(() => {
        saveLocalTodos()
        filterHandler()
    }, [todos, status]);

    //functions
    const filterHandler = () => {
        switch (status) {
            case "completed":
                setFilteredTodos(todos.filter((todo) => todo.completed === true))
                break;
            case "uncompleted":
                setFilteredTodos(todos.filter((todo) => todo.completed === false))
                break;
            default:
                setFilteredTodos(todos);
                break;
        }
        ;
    };

    //save local
    const saveLocalTodos = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    };
    const getLocalTodos = () => {
        if (localStorage.getItem("todos") === null) {
            localStorage.setItem("todos", JSON.stringify([]));
        } else {
            let todoLocal = JSON.parse(localStorage.getItem("todos"))
            console.log(todoLocal);
            setTodos(todoLocal);
        }
    };

    return (
        <div className="App">
            <header>
                <h1>Garries Todo List</h1>
            </header>
            <Form
                inputText={inputText}
                todos={todos}
                setTodos={setTodos}
                setInputText={setInputText}
                setStatus={setStatus}
                filteredTodos={filteredTodos}
            />
            <TodoList filteredTodos={filteredTodos}
                      setTodos={setTodos}
                      todos={todos}/>
        </div>
    );
}

export default App;
