import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  TextField,
  Button,
} from '@mui/material'
import { useEffect, useState } from 'react'
import TodoItem from './components/TodoItem'
import {
  getTodosFromLocalStorage,
  setTodosToLocalStorage,
} from './utils/localStorage'

function App() {
  const [todos, setTodos] = useState<TodoItemType[]>(getTodosFromLocalStorage())

  const [title, setTitle] = useState<TodoItemType['title']>('')

  const addHandler = (): void => {
    if (title === '') {
      return
    }
    const todo: TodoItemType = { id: Date.now(), title, isCompleted: false }
    setTodos((prev) => [...prev, todo])
    setTitle('')
  }

  const completeHandler = (id: TodoItemType['id']): void => {
    const thatTodo = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    )
    setTodos(thatTodo)
  }

  const deleteHandler = (id: TodoItemType['id']): void => {
    const thatTodo = todos.filter((item) => item.id !== id)
    setTodos(thatTodo)
  }

  const editHandler = (
    id: TodoItemType['id'],
    title: TodoItemType['title']
  ): void => {
    const thatTodo = todos.map((item) =>
      item.id === id ? { ...item, title: title } : item
    )
    setTodos(thatTodo)
  }

  useEffect(() => {
    setTodosToLocalStorage(todos)
  }, [todos])

  return (
    <Container maxWidth="md" sx={{ height: '90vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography>Todo App</Typography>
        </Toolbar>
      </AppBar>

      <Stack height="80%" direction="column" spacing="1rem" p="1rem">
        {todos.map((i) => (
          <TodoItem
            key={i.id}
            todo={i}
            deleteHandler={deleteHandler}
            completeHandler={completeHandler}
            editHandler={editHandler}
          />
        ))}
      </Stack>

      <TextField
        fullWidth
        label="New Task"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ margin: '1rem 0' }}
        onClick={addHandler}
      >
        Add
      </Button>
    </Container>
  )
}

export default App
