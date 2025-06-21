import { useState, useEffect } from 'react';
   import { useSelector, useDispatch } from 'react-redux';
   import { loadTasks, addTask, deleteTask, toggleComplete, startEdit, saveEdit, cancelEdit } from './store';

   function App() {
       const dispatch = useDispatch();
       const { tasks, editId, editText } = useSelector(state => state.todo);
       const [input, setInput] = useState('');

       useEffect(() => {
           const savedTasks = localStorage.getItem('todo-tasks');
           if (savedTasks) {
               dispatch(loadTasks(JSON.parse(savedTasks)));
           }
       }, [dispatch]);

       useEffect(() => {
           localStorage.setItem('todo-tasks', JSON.stringify(tasks));
       }, [tasks]);

       const handleAddTask = (e) => {
           e.preventDefault();
           if (input.trim()) {
               const newTask = {
                   id: Date.now(),
                   text: input,
                   completed: false,
                   createdAt: new Date().toISOString()
               };
               dispatch(addTask(newTask));
               setInput('');
           }
       };

       const completedCount = tasks.filter(task => task.completed).length;
       const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

       return (
           <div className="container-wrapper">
               <div className="glass-card">
                   <div className="header d-flex justify-content-between align-items-center">
                       <h1 className="h3 mb-0">
                           <i className="fas fa-tasks me-2"></i>
                           TODO Tasks
                       </h1>
                       <span className="task-count">
                           {completedCount}/{tasks.length} done
                       </span>
                   </div>
                   
                   <div className="progress-bar">
                       <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                   </div>
                   
                   <form onSubmit={handleAddTask} className="mb-4">
                       <div className="input-group">
                           <input 
                               type="text" 
                               className="form-control-glass form-control-lg" 
                               placeholder="What needs to be done?" 
                               value={input}
                               onChange={(e) => setInput(e.target.value)}
                               autoFocus
                           />
                           <button 
                               className="btn btn-neon" 
                               type="submit"
                               disabled={!input.trim()}
                           >
                               <i className="fas fa-plus me-2"></i>Add
                           </button>
                       </div>
                   </form>
                   
                   {tasks.length === 0 ? (
                       <div className="empty-state">
                           <i className="far fa-smile-beam"></i>
                           <h4>No tasks yet!</h4>
                           <p className="text-muted">Add your first task above</p>
                       </div>
                   ) : (
                       <ul className="list-unstyled">
                           {tasks.map(task => (
                               <li key={task.id} className="task-item">
                                   {editId === task.id ? (
                                       <div className="d-flex align-items-center w-100">
                                           <input 
                                               type="text" 
                                               className="form-control-glass me-2 flex-grow-1" 
                                               value={editText}
                                               onChange={(e) => dispatch(startEdit({ id: task.id, text: e.target.value }))}
                                               autoFocus
                                           />
                                           <button 
                                               className="btn-icon success"
                                               onClick={() => dispatch(saveEdit({ id: task.id, text: editText }))}
                                               disabled={!editText.trim()}
                                           >
                                               <i className="fas fa-check"></i>
                                           </button>
                                           <button 
                                               className="btn-icon cancel"
                                               onClick={() => dispatch(cancelEdit())}
                                           >
                                               <i className="fas fa-times"></i>
                                           </button>
                                       </div>
                                   ) : (
                                       <>
                                           <input 
                                               type="checkbox" 
                                               className="checkbox-custom"
                                               checked={task.completed}
                                               onChange={() => dispatch(toggleComplete(task.id))}
                                           />
                                           <span className={`task-text ${task.completed ? 'text-muted text-decoration-line-through' : ''}`}>
                                               {task.text}
                                           </span>
                                           <div className="ms-auto d-flex">
                                               <button 
                                                   className="btn-icon edit me-2"
                                                   onClick={() => dispatch(startEdit({ id: task.id, text: task.text }))}
                                               >
                                                   <i className="fas fa-edit"></i> Edit
                                               </button>
                                               <button 
                                                   className="btn-icon delete"
                                                   onClick={() => dispatch(deleteTask(task.id))}
                                               >
                                                   <i className="fas fa-trash-alt"></i> Delete
                                               </button>
                                           </div>
                                       </>
                                   )}
                               </li>
                           ))}
                       </ul>
                   )}
               </div>
           </div>
       );
   }

   export default App;