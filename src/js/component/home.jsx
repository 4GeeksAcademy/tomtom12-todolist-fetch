import React, { useEffect, useState } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({});

  function createUser() {


    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([]),
    };
    fetch("https://playground.4geeks.com/apis/fake/todos/user/tbrito", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/tbrito")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setTasks(data);

        if (data.msg == "The user tbrito doesn't exists") {
          createUser()
        }

      })
      .catch((err) => {
        console.log("error", err)



      })

  }, []);

  const handleTaskAdd = (onKeyDownEvent) => {
    //  newTask.label.length != 0 -> if task label is not empty then you can submit the new task // ex. { label: e.target.value <- cannot be empty else you get errors, done: false }
    if (onKeyDownEvent.key === "Enter" && newTask.label.length != 0) {
      let currentTodos = [...tasks, newTask];

      fetch("https://playground.4geeks.com/apis/fake/todos/user/tbrito", {
        method: "PUT",
        body: JSON.stringify(currentTodos),
        headers: { "Content-type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setTasks(currentTodos);
        })
        .catch((error) => {
          console.log(error);
        });

      setNewTask(""); // Reset
    }
  };

  const handleTaskDelete = (i) => {
    const updatedTasks = tasks.filter((task, index) => i !== index);



    if (updatedTasks.length === 0) {
      // If the updatedTasks array is empty, delete the entire array.
      fetch("https://playground.4geeks.com/apis/fake/todos/user/tbrito", {
        method: "PUT", // Use the PUT method to empty the entire array | if you use DELETE method then it deletes the user and it makes the other methods GET, POST, PUT unusable until you reload the page again
        headers: { "Content-type": "application/json" },
        body: JSON.stringify([])
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setTasks([]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // If there are remaining tasks, update the tasks array.
      fetch("https://playground.4geeks.com/apis/fake/todos/user/tbrito", {
        method: "PUT",
        body: JSON.stringify(updatedTasks),
        headers: { "Content-type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setTasks(updatedTasks);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleInputChange = (e) => {
    // if e.target.value = false then e.target.value.length is going to throw and error BECAUSE there is not such thing as false.length
    setNewTask({ label: e.target.value || "", done: false });
  };

  return (
    <div className="bigbox">
      <h1 className="layer big">Todos</h1>
      <div className="layer normal">
        <input
          className="layer"
          type="text"
          placeholder="What needs to be done"
          onChange={(e) => handleInputChange(e)}
          onKeyDown={handleTaskAdd}
        />
      </div>
      {tasks.length ? (
        <ul className="layer">
          {tasks.map((task, i) => (
            <li key={i}>
              <span>{task.label}</span>
              <button onClick={() => handleTaskDelete(i)} className="button button-hidden">
                &#x0078;
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="layer normal">No tasks, add a task</p>
      )}
      <p className="counter">{tasks.length} items left</p>
      <div className="sheet1"></div>
      <div className="sheet2"></div>
    </div>
  );
};

export default Home;
