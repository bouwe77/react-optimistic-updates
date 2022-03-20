import { useEffect, useRef, useState } from "react";
import { addTodo, getTodos } from "./api";

const initialApiStatus = { get: true, post: true };

export default function App() {
  const newTodoRef = useRef();
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [apiStatus, setApiStatus] = useState(initialApiStatus);

  useEffect(() => {
    console.log("render...");
  });

  useEffect(() => {
    console.log("useEffect...");
    setErrorMessage(null);
    getTodos(apiStatus.get)
      .then((todos) => setTodos(todos))
      .catch((errorMessage) => setErrorMessage(errorMessage));
  }, [apiStatus]);

  function handleSubmit(event) {
    event.preventDefault();
    addTodo(newTodoRef.current.value, apiStatus.post)
      .then((newTodo) => {
        setTodos((currentTodos) => [...currentTodos, newTodo]);
        newTodoRef.current.value = "";
      })
      .catch((error) => setErrorMessage(error));
  }

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <>
      <Header>
        <input
          type="checkbox"
          onChange={() =>
            setApiStatus((currentApiStatus) => ({
              ...currentApiStatus,
              get: !currentApiStatus.get
            }))
          }
          checked={!apiStatus.get}
        />
        API GET broke
        <br />
        <input
          type="checkbox"
          onChange={() =>
            setApiStatus((currentApiStatus) => ({
              ...currentApiStatus,
              post: !currentApiStatus.post
            }))
          }
          checked={!apiStatus.post}
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
