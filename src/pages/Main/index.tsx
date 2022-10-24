import { FC, useEffect, useState } from "react";
import { Container } from "@mui/material";
import TaskList from "../../components/TaskList";
import Form from "../../components/Form";
import FilterByTime from "../../components/FilterByTime";
import taskMock from "../../mocks/taskMock";
import { IMock } from "../../types/IMock";

const Main: FC = () => {
  const [renderingTasks, setRenderingTasks] = useState<IMock[]>(taskMock);
  const [savedTasks, setSavedTasks] = useState<IMock[]>(taskMock);

  const deleteTask = (id: number) => {
    const filteredTasks = savedTasks.filter((el: IMock) => el.id !== id);
    setSavedTasks(filteredTasks);
  };

  useEffect(() => {
    setRenderingTasks(savedTasks);
  }, [savedTasks]);

  return (
    <Container sx={{ pt: 5, textAlign: 'left' }}>
      <h2>Add Task</h2>
      <Form setSavedTasks={setSavedTasks} />
      <h2>Tasks List</h2>
      <FilterByTime setRenderingTasks={setRenderingTasks} savedTasks={savedTasks} />
      <TaskList renderingTasks={renderingTasks} deleteTask={deleteTask} />
    </Container>
  );
}

export default Main;