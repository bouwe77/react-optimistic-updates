const todos = [
  { id: 1, what: "Laundry" },
  { id: 2, what: "Dishes" }
];

const getTodos = (willSucceed) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (willSucceed) resolve(todos);
      else reject("GET failed");
    }, 800);
  });
};

const addTodo = (what, willSucceed) => {
  const newTodo = { id: todos.length + 1, what };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (willSucceed) {
        todos.push(newTodo);
        resolve(newTodo);
      } else reject("POST failed");
    }, 800);
  });
};

export { getTodos, addTodo };
