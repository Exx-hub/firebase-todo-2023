import { useEffect, useState } from "react";
import "./App.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  // getDocs,
  onSnapshot,
  // query,
  updateDoc,
  // where,
} from "firebase/firestore";
import db from "./firebase-config";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  console.log(todos);

  const todosCollectionReference = collection(db, "todos");

  useEffect(() => {
    // getTodos(); - if there is change, you need to refresh

    // with snapshot method, changes are detected and front is automatically updated when there are changes.

    // const q = query(todosCollectionReference, where("id", "==", "DSkt0wrGTbuLwErLPmHZ"));
    // console.log({ q });

    const unsubscribe = onSnapshot(todosCollectionReference, (querySnapshot) => {
      let todosArr = [];

      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });

      setTodos(todosArr);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const getTodos = async () => {
  //   const data = await getDocs(todosCollectionReference);

  //   const parsedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  //   setTodos(parsedData);
  //   // console.log(data.docs[0].data());
  // };

  const addTodo = async () => {
    if (todo) {
      await addDoc(todosCollectionReference, { title: todo, isCompleted: false });

      setTodo("");
    }
  };

  const handleToggle = async (id, isCompleted) => {
    const todoDoc = doc(db, "todos", id);
    await updateDoc(todoDoc, { isCompleted: !isCompleted });
  };

  const handleDelete = async (id) => {
    const todoDoc = doc(db, "todos", id);

    await deleteDoc(todoDoc);
  };

  return (
    <>
      <h1>Todo App</h1>
      <div className="text-black">
        <input value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button className="p-2 bg-white border border-blue-400" onClick={addTodo}>
          +
        </button>
      </div>
      {todos.map((todo) => (
        <div key={todo.id} className="flex border border-white p-2 justify-between">
          <div className="flex items-center space-x-1">
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleToggle(todo.id, todo.isCompleted)}
            />
            <h2>{todo.title}</h2>
          </div>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      ))}
      <p>You have {todos.length} todos.</p>
    </>
  );
}

export default App;
