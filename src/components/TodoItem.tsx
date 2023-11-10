import {
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'

type PropType = {
  todo: TodoItemType
  deleteHandler: (id: TodoItemType['id']) => void
  completeHandler: (id: TodoItemType['id']) => void
  editHandler: (id: TodoItemType['id'], title: TodoItemType['title']) => void
}

const TodoItem = ({
  todo,
  deleteHandler,
  completeHandler,
  editHandler,
}: PropType) => {
  const [editActive, setEditActive] = useState<boolean>(false)
  const [title, setTitle] = useState<TodoItemType['title']>(todo.title)

  return (
    <Paper variant="outlined" sx={{ padding: '1rem' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {editActive ? (
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && title !== '') {
                editHandler(todo.id, title)
                setEditActive(false)
              }
              if (e.key === 'Escape') {
                setEditActive(false)
              }
            }}
          />
        ) : (
          <Typography
            sx={{
              textDecoration: todo.isCompleted && 'line-through',
              color: todo.isCompleted && '#aeaeae',
            }}
          >
            {todo.title}
          </Typography>
        )}
        <Stack direction="row">
          <Checkbox
            checked={todo.isCompleted}
            onChange={() => {
              completeHandler(todo.id)
            }}
          />
          <Button
            onClick={() => {
              editHandler(todo.id, title)
              setEditActive(!editActive)
            }}
          >
            {editActive ? '✅' : '✏️'}
          </Button>
          <Button
            onClick={() => {
              deleteHandler(todo.id)
            }}
          >
            🗑️
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default TodoItem
