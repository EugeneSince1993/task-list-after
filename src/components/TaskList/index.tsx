import { styled } from "@mui/material";
import { IMock } from "../../types/IMock";
import TaskItem from "./TaskItem";
import styles from './TaskList.module.scss';

export interface ITaskListProps {
  renderingTasks: IMock[];
  deleteTask: (id: number) => void;
}

const TaskList = ({renderingTasks, deleteTask}: ITaskListProps) => {
  const HeaderWrapperStyled = styled('div')({
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    justifyContent: 'flex-start',
    padding: '5px 25px',
  });

  return(
    <div className={styles.taskList}>
      <HeaderWrapperStyled>
        <p className={styles.type}>Type</p>
        <p className={styles.description}>Description</p>
        <p className={styles.timeToDo}>Time to do</p>
        <div className={styles.remaining}></div>
      </HeaderWrapperStyled>
      {renderingTasks.length && renderingTasks.map((task, index) => (
        <TaskItem key={index} task={task} deleteTask={deleteTask} />
      ))}
    </div>
  );
};

export default TaskList;