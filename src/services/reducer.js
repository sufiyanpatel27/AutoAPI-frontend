import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
    Routes: [],
    backend_service: 1
}

export const reducerSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                data: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) =>
                todo.id !== action.payload
            )
        },
        updateTodo: (state, action) => {
            const { id, data } = action.payload;
            state.todos.map((todo) => {
                if (todo.id === id) {
                    todo.data = data
                }
            })
        },

        // routes reducers
        addRouter: (state, action) => {
            const router = {
                id: nanoid(),
                data: action.payload
            }
            state.Routes.push(router)
        },
        updateRouter: (state, action) => {
            const { id, data } = action.payload;
            state.Routes.map((route) => {
                if (route.id === id) {
                    route.data = data
                }
            })
        },
        removeRouter: (state, action) => {
            state.Routes = state.Routes.filter((route) =>
                route.id !== action.payload
            )
        },

        // backend service
        updateBackendService: (state, action) => {
            state.backend_service = action.payload;
        }
    }
})


export const { addTodo, removeTodo, updateTodo, addRouter, updateRouter, removeRouter, updateBackendService } = reducerSlice.actions

export default reducerSlice.reducer