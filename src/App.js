import { useEffect, useRef, useState } from "react";
import { addTodo, getTodos } from "./api";

export default function App() {
  const newTodoRef = useRef();
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiPostWorks, setApiPostWorks] = useState(true);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    setErrorMessage(null);
    getTodos()
      .then((todos) => setTodos(todos))
      .catch((errorMessage) => setErrorMessage(errorMessage));
  }, [refetch]);

  function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    const newTodoValue = newTodoRef.current.value;

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: todos.length + 1, what: newTodoValue }
    ]);

    newTodoRef.current.value = "";

    addTodo(newTodoValue, apiPostWorks)
      .then(() => {
        setRefetch((prev) => !prev);
      })
      .catch((error) => setErrorMessage(error));
  }

  return (
    <>
      <Header>
        <input
          type="checkbox"
          onChange={() => setApiPostWorks((prev) => !prev)}
          checked={!apiPostWorks}
        />
        API POST broke
      </Header>

      {errorMessage ? <Error>{errorMessage}</Error> : null}

      <form onSubmit={handleSubmit}>
        <input type="text" ref={newTodoRef} />
        <button type="submit">OK</button>
      </form>

      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.what}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

function Error({ children }) {
  return <div style={{ color: "red", fontWeight: "bold" }}>{children}</div>;
}

function Header({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <h1 style={{ padding: 0, margin: 0 }}>My TO DO list</h1>
      <div style={{ margin: "8px 20px" }}>{children}</div>
    </div>
  );
}
