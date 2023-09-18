import React, { useEffect, useState } from "react";


//create your first component
const Home = () => {
    // before you return in your "javascript" part 
    //  this is a useState hook and it is split in 2
    //  the variable and a func to edit that variable
    //  ex. [varName, funcName(this is alwasys the 'set'+ the name of the var)]
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({});
    // useeffect to get stuff and put it in todolist
    useEffect(()=>{
        fetch("https://playground.4geeks.com/apis/fake/todos/user/tbrito")
        .then((res) => {
            return res.json()
        })
        .then((data)=>{
            setTasks(data)
        });
    },[]);
    // useEffect(() => {
    //     fetch("https://playground.4geeks.com/apis/fake/todos/user/tbrito",
    //         {
    //             method: "PUT",
    //             body: JSON.stringify(tasks),
    //             headers: { "Content-type": "application/json" },
    //         })
    //         .then((res) => {
    //             return res.json()
    //         })
    //         .then((data) => {
    //             console.log(data)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // }, [tasks]);
    // const handleTaskAdd = () => {
    //      setTasks([...tasks, newTask]);
    //      setNewTask("");
    // };
    const handleTaskAdd = (onKeyDownEvent) => {
        console.log(onKeyDownEvent.key)
        if (onKeyDownEvent.key === "Enter") {
            let currentTodos = [...tasks, newTask]

            fetch("https://playground.4geeks.com/apis/fake/todos/user/tbrito",
            {
                method: "PUT",
                body: JSON.stringify(currentTodos),
                headers: { "Content-type": "application/json" },
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setTasks(currentTodos);
            })
            .catch((error) => {
                console.log(error)
            });
            
            setNewTask("");// reset 
        }
      };
    //  .map((item, index) => { return () }) .filter() .forEach() .reduce()
    // let data = ["dance", "jump", "cry"]
    const handleTaskDelete = (banana) => {
        const updatedTasks = tasks.filter((task, i) => i !== banana);

        fetch("https://playground.4geeks.com/apis/fake/todos/user/tbrito",
            {
                method: "PUT",
                body: JSON.stringify(updatedTasks),
                headers: { "Content-type": "application/json" },
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setTasks(updatedTasks);
            })
            .catch((error) => {
                console.log(error)
            });
       
    };
    const handleInputChange = (e) => {
        setNewTask({ label: e.target.value, done: false })
    }
    
    return (
        <div className="bigbox">
             <h1 className="layer big">Todos</h1>
            <div className="layer normal">
                <input
                    className="layer"
                    type="text"
                    placeholder="What needs to be done"
                    // value={tasks}
                    onChange={(e) => handleInputChange(e)}
                //    onKeyPress={(e) => {
                //   if (e.key === "Enter") {
                //     handleTaskAdd();
                //   }
                //    }}
                onKeyDown={handleTaskAdd}
                />

            </div>
            {tasks.length ? (
                <ul className="layer">
                    {tasks.map((task, i) => (
                        <li key={i}>
                            <span>{task.label}</span>
                            <button onClick={() => handleTaskDelete(i)} className="button button-hidden">&#x0078;</button>
                        </li>
                    ))}
                </ul>
            ):(
                <p className="layer normal">No tasks, add a task</p>
            )}
            <p className="counter">{tasks.length} items left</p>
            <div className="sheet1"></div>
            <div className="sheet2"></div> 
        </div>
    );
};

export default Home;