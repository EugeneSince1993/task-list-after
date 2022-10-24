import { ChangeEvent, FocusEvent, FormEvent } from "react";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { IMock } from "../../types/IMock";
import styles from "./Form.module.scss";

export interface IFormProps {
  setSavedTasks: Dispatch<SetStateAction<IMock[]>>;
}

const Form = ({ setSavedTasks }: IFormProps) => {
  const [formState, setFormState] = useState<IMock>({
    id: 3,
    taskType: '',
    description: '',
    timeToDo: 0
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let type = event.target.type;
    let name = event.target.name;
    let value: string | number = event.target.value;
    if (type === "number") {
      value = Number(value);
    }
    setFormState(prevState => ({...prevState, [name]: value}));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formState.taskType === '' || formState.description === '' || 
      formState.timeToDo === 0) {
      return alert("Заполните все поля");
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

  const checkOnEmptyField = (event: FocusEvent<HTMLInputElement, Element>) => {
    let name = event.target.name;
    let taskLabel = "";
    let value = event.target.value;
    if (name === "taskType") {
      taskLabel = "Тип";
    } else if (name === "description") {
      taskLabel = "Описание";
    } else if (name === "timeToDo") {
      taskLabel = "Время выполнения";
    }
    if (value === "" || value === "0") {
      return alert(`Поле "${taskLabel}" не заполнено!`);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskType">
          Task Type
          <input 
            type="text" 
            id="taskType"
            name="taskType" 
            value={formState.taskType} 
            onChange={handleInputChange} 
            onBlur={checkOnEmptyField}
          />
        </label>
        <label htmlFor="description">
          Description
          <input 
            type="text" 
            id="description"
            name="description"
            value={formState.description} 
            onChange={handleInputChange} 
            onBlur={checkOnEmptyField}
          />
        </label>
        <label htmlFor="timeToDo">
          Time to do
          <input 
            type="number" 
            id="timeToDo"
            name="timeToDo"
            value={formState.timeToDo} 
            onChange={handleInputChange} 
            onBlur={checkOnEmptyField}
          />
        </label>
        <Button type="submit" variant="outlined">Add</Button>
      </form>
    </div>
  );
}

export default Form;
