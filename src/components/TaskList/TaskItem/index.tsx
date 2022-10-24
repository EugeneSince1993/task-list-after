import { MouseEvent } from "react";
import { IconButton, styled } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { IMock } from "../../../types/IMock";
import styles from './TaskItem.module.scss';

export interface ITaskProps {
  task: IMock;
  deleteTask: (id: number) => void;
}

const TaskItem = ({ task, deleteTask }: ITaskProps) => {
  const ItemWrapperStyled = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'lightgrey',
    marginBottom: 10,
    borderRadius: 15,
    boxShadow: '10px, 10px, 10px grey',
    padding: '5px 25px',
    textAlign: 'left'
  });

  const deleteTaskItem = () => {
    deleteTask(task.id);
  };

  return (
    <ItemWrapperStyled className={styles.taskItem}>
      <p className={styles.type}>{task.taskType}</p>
      <p className={styles.description}>{task.description}</p>
      <p className={styles.timeToDo}>{task.timeToDo}</p>
      <div className={styles.iconButtonWrapper}>
        <IconButton
          aria-label="close"
          sx={{ color: (theme) => theme.palette.grey[500] }}
          onClick={deleteTaskItem}
        >
          <CloseIcon />
        </IconButton>
      </div>
    </ItemWrapperStyled>
  );
};

export default TaskItem;