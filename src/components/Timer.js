import React, { useState, useEffect } from "react";
import { makeStyles, Button } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  labelTime: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  playButton: {
    //   color: theme.status.play,
    fontSize: "48px",
  },
  pauseButton: {
    //   color: theme.status.pause,
    fontSize: "48px",
  },
  flagButton: {
    color: "",
    fontSize: "48px",
  },
  restoreButton: {
    color: "",
    fontSize: "48px",
  },
  tableContainer: {
    maxHeight: "70vh",
  },
  table: {
    minWidth: 600,
  },
  tableBody: {
    alignItems: "space-around",
    overflowY: "auto",
  },
  lapCell: {
    display: "flex",
    flexDirection: "row",
  },
  lapCellTypo: {
    marginRight: 20,
  },
}));



function Timer() {
  
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [editedDescription, seteditedDescription] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    let intervalId;

    if (isRunning && !isPaused) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, isPaused]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
    setIsRunning(false);
  };

  const handleSave = () => {
    setIsModalOpen(true);
    setIsRunning(false);
  };
  const onReset = () => {
    setTime(0);
    setTaskList([]);
    setIsRunning(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskTitle("");
    setTaskDescription("");
  };

  const onEdit = (val) => {
    taskList?.forEach((item, i) => {
      if (item.time == val) {
        setSelectedList(taskList[i]);
      }
    });
    setIsEdit(true);
  };
  const onEditSave = () => {
     taskList?.forEach((item) => {
      if (item.time === selectedList.time) {
        item.description = editedDescription;
      }
    });
    setIsEdit(false);
  };

  const onEditCancel = () => {
    setIsEdit(false);
  };

  const handleTaskSave = () => {
    const task = {
      title: taskTitle,
      description: taskDescription,
      time: time,
    };
    setTaskList((prevTaskList) => [...prevTaskList, task]);
    handleCloseModal();
  };
  return (
    <div className="main_container">
      <div className="watch_content">
        {" "}
        <div className="watch_box">
          {new Date(time * 1000).toISOString().substr(11, 8)}
        </div>
      </div>

      <div className="watch_btns_box">
        <Button disabled={isRunning} onClick={handleStart}>
          Start
        </Button>
        <Button disabled={!isRunning || isPaused} onClick={handlePause}>
          Pause
        </Button>
        <Button disabled={!isRunning && !time} onClick={handleSave}>
          Save
        </Button>
        <Button disabled={!isRunning && !time} onClick={onReset}>
          Reset
        </Button>
        <h2>Task List</h2>
      </div>
      {taskList.length ? (
        <div className="watch_btn_box">
          <div style={{ marginTop: "20px" }} className="task_list">
            <table>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Time</th>
                <th>Edit</th>
              </tr>
              {taskList?.map((task) => (
                <tr>
                  <th>{task.title}</th>
                  <th>{task.description}</th>
                  <th>
                    {new Date(task.time * 1000).toISOString().substr(11, 8)}
                  </th>
                  <th>
                    {" "}
                    <Button
                      onClick={() => {
                        onEdit(task.time);
                      }}
                    >
                      Edit
                    </Button>
                  </th>
                </tr>
              ))}
            </table>
          </div>
        </div>
      ) : (
        <div className="watch_btn_box">
          <div style={{ marginTop: "20px" }} className="task_list">
            <h2 style={{ fontWeight: 400, color: "white" }}> No Task</h2>
          </div>
        </div>
      )}

      {isEdit && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="save_form"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <h2>Save Task</h2>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={selectedList.title}
              disabled
              //   onChange={(e) => setTaskTitle(e.target.value)}
              style={{ width: "100%" }}
            />
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={selectedList.description}
              onChange={(e) => {
                seteditedDescription(e.target.value);
                selectedList.description = e.target.value;
              }}
              //   style={{ width: "100%", height: "100px" }}
            ></textarea>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Button onClick={onEditSave}>Save Task</Button>
              <Button className="cancel_btn" onClick={onEditCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="save_form"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <h2>Save Task</h2>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              style={{ width: "100%" }}
            />
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              //   style={{ width: "100%", height: "100px" }}
            ></textarea>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Button onClick={handleTaskSave}>Save Task</Button>
              <Button className="cancel_btn" onClick={handleCloseModal}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Timer;
