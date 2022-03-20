const getTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(todos);
    }, 800);
  });
};

const addTodo = (what, willSucceed = true) => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const newTodo = { id: todos.length + 1, what };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (willSucceed) {
        todos.push(newTodo);
        localStorage.setItem("todos", JSON.stringify(todos));
        resolve(newTodo);
      } else reject("POST failed");
    }, 800);
  });
};

export { getTodos, addTodo };
