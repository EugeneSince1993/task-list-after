import { ChangeEvent, FormEvent } from "react";
import { Button, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { IMock } from "../../types/IMock";
import styles from "./Form.module.scss";

interface IFormProps {
  setSavedTasks: Dispatch<SetStateAction<IMock[]>>;
}

interface IError {
  taskType: boolean;
  description: boolean;
  timeToDo: boolean;
}

interface IHelperText {
  taskType: string;
  description: string;
  timeToDo: string;
}

const Form = ({ setSavedTasks }: IFormProps) => {
  const [formState, setFormState] = useState<IMock>({
    id: 3,
    taskType: '',
    description: '',
    timeToDo: 0
  });

  const [error, setError] = useState<IError>({
    taskType: false,
    description: false,
    timeToDo: false,
  });
  const [helperText, setHelperText] = useState<IHelperText>({
    taskType: '',
    description: '',
    timeToDo: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value: string | number = event.target.value;
    let length = event.target.value.length;
    let numRegex = new RegExp(/[0-9]+/);
    if (length > 0) {
      if (name === "timeToDo") {
        if (!numRegex.test(value)) {
          setError(prevState => ({...prevState, timeToDo: true}));
          setHelperText(prevState => ({
            ...prevState, 
            timeToDo: 'Введите числовое значение'
          }));
          setFormState(prevState => ({...prevState, [name]: value}));
        } else {
          setError(prevState => ({...prevState, [name]: false}));
          setHelperText(prevState => ({...prevState, [name]: ''}));
          setFormState(prevState => ({...prevState, [name]: Number(value)}));
        } 
      } else {
        setError(prevState => ({...prevState, [name]: false}));
        setHelperText(prevState => ({...prevState, [name]: ''}));
        setFormState(prevState => ({...prevState, [name]: value}));
      }
    } else {
      setError(prevState => ({...prevState, [name]: true}));
      setHelperText(prevState => ({
        ...prevState, 
        [name]: 'Заполните поле'
      }));
      setFormState(prevState => ({...prevState, [name]: value}));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error.taskType || error.description || error.timeToDo) {
      return;
    } else {
      setSavedTasks(prevState => {
        return [...prevState, formState];
      });
      setFormState({
        id: formState.id + 1,
        taskType: '',
        description: '',
        timeToDo: 0
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.labels}>
          <label htmlFor="taskType">Task Type</label>
          <label htmlFor="description">Description</label>
          <label htmlFor="timeToDo">Time to do</label>
        </div>
        <div className={styles.inputs}>
          <TextField 
            className={styles.taskInput}
            id="taskType" 
            name="taskType"
            value={formState.taskType}
            onChange={handleInputChange}
            error={error.taskType}
            helperText={helperText.taskType}
          />
          <TextField 
            className={styles.taskInput}
            id="description" 
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            error={error.description}
            helperText={helperText.description}
          />
          <TextField 
            className={styles.taskInput}
            id="timeToDo" 
            name="timeToDo"
            value={formState.timeToDo}
            onChange={handleInputChange}
            error={error.timeToDo}
            helperText={helperText.timeToDo}
          />
          <Button type="submit" variant="outlined">Add</Button> 
        </div>
      </form>
    </div>
  );
}

export default Form;
