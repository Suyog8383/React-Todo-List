import { useState } from "react";
import { v4 } from "uuid";

const App = () => {
  const [toDoData, setTodoData] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const [toDo, setTodo] = useState([]);

  const changeData = () => {
    if (!toDoData) {
      return alert("enter something");
    }
    setTodo((LastState) => {
      return [...LastState, { title: toDoData, id: v4() }];
    });
    setTodoData("");
  };

  const deleteData = (id) => {
    setTodo((prevState) => {
      return prevState.filter((item, index) => index !== id);
    });
  };

  const updateData = (item) => {
    setEditingTodo(item.id);
    setNewTodoTitle(item.title);
  };

  const clearData = () => {
    setTodoData("");
  };

  const handleChanges = () => {
    setTodo((prevState) => {
      return prevState.map((item) => {
        if (item.id === editingTodo) {
          item.title = newTodoTitle;
        }
        return item;
      });
    });

    setEditingTodo(null);
    setNewTodoTitle(null);
  };

  return (
    <div className="container my-3">
      <label htmlFor="">Todo List:=</label>
      <input
        type="text"
        value={toDoData}
        onChange={(e) => {
          setTodoData(e.target.value);
        }}
      />
      <button className="btn btn-success mx-3" onClick={changeData}>
        Add
      </button>
      <button className="btn btn-success mx-3" onClick={clearData}>
        Clear
      </button>

      {/* output area */}

      <table class="table my-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {toDo.map((item, index) => {
            return (
              <>
                <tr key={index}>
                  {item.id === editingTodo ? (
                    <td>
                      <input
                        type="text"
                        value={newTodoTitle}
                        onChange={(e) => setNewTodoTitle(e.target.value)}
                      />
                      <button
                        style={{ margin: "6px" }}
                        className="btn btn-primary"
                        onClick={handleChanges}
                      >
                        Save Changes
                      </button>
                    </td>
                  ) : (
                    <>
                      <td>{item.title}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => updateData(item)}
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteData(index)}
                        >
                          {" "}
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default App;
