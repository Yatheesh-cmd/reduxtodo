import { configureStore, createSlice } from '@reduxjs/toolkit';

   const todoSlice = createSlice({
       name: 'todo',
       initialState: {
           tasks: [],
           editId: null,
           editText: ''
       },
       reducers: {
           loadTasks: (state, action) => {
               state.tasks = action.payload;
           },
           addTask: (state, action) => {
               state.tasks.push(action.payload);
           },
           deleteTask: (state, action) => {
               state.tasks = state.tasks.filter(task => task.id !== action.payload);
           },
           toggleComplete: (state, action) => {
               const task = state.tasks.find(task => task.id === action.payload);
               if (task) {
                   task.completed = !task.completed;
               }
           },
           startEdit: (state, action) => {
               state.editId = action.payload.id;
               state.editText = action.payload.text;
           },
           saveEdit: (state, action) => {
               const task = state.tasks.find(task => task.id === action.payload.id);
               if (task) {
                   task.text = action.payload.text;
               }
               state.editId = null;
               state.editText = '';
           },
           cancelEdit: (state) => {
               state.editId = null;
               state.editText = '';
           }
       }
   });

   export const { loadTasks, addTask, deleteTask, toggleComplete, startEdit, saveEdit, cancelEdit } = todoSlice.actions;

   export const store = configureStore({
       reducer: {
           todo: todoSlice.reducer
       }
   });