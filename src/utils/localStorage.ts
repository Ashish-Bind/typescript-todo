export const setTodosToLocalStorage = (todos: TodoItemType[]): void => {
  localStorage.setItem('myTodos', JSON.stringify(todos))
}

export const getTodosFromLocalStorage = (): TodoItemType[] => {
  const myTodos = localStorage.getItem('myTodos')
  return myTodos ? JSON.parse(myTodos) : []
}
