import { FC, useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { Button, TextField } from "@mui/material";
import styles from "./FilterByTime.module.scss";
import classNames from "classnames";
import { IMock } from "../../types/IMock";

interface IFilterByTimeProps {
  setRenderingTasks: Dispatch<SetStateAction<IMock[]>>;
  savedTasks: IMock[];
}

interface IError {
  inputFrom: boolean;
  inputTo: boolean;
}

interface IHelperText {
  inputFrom: string;
  inputTo: string;
}

interface IRange {
  inputFrom: number;
  inputTo: number;
}

const FilterByTime: FC<IFilterByTimeProps> = ({ setRenderingTasks, savedTasks }) => {
  const [error, setError] = useState<IError>({
    inputFrom: false,
    inputTo: false,
  });
  const [helperText, setHelperText] = useState<IHelperText>({
    inputFrom: '',
    inputTo: '',
  });

  const taskTimes = savedTasks.map((el: IMock) => el.timeToDo);
  
  const taskMinTime = Math.min(...taskTimes);
  const taskMaxTime = Math.max(...taskTimes);

  const [range, setRange] = useState<IRange>({
    inputFrom: taskMinTime,
    inputTo: taskMaxTime,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value: string | number = event.target.value;
    let length = event.target.value.length;
    let numRegex = new RegExp(/[0-9]+/);
    if (length > 0) {
      if (!numRegex.test(value)) {
        setError(prevState => ({...prevState, [name]: true}));
        setHelperText(prevState => ({
          ...prevState, 
          [name]: 'Введите числовое значение'
        }));
        setRange(prevState => ({...prevState, [name]: value}));
      } else {
        setError(prevState => ({...prevState, [name]: false}));
        setHelperText(prevState => ({...prevState, [name]: ''}));
        setRange(prevState => ({...prevState, [name]: Number(value)}));
      }
    } else {
      setError(prevState => ({...prevState, [name]: true}));
      setHelperText(prevState => ({
        ...prevState, 
        [name]: 'Заполните поле'
      }));
      setRange(prevState => ({...prevState, [name]: value}));
    }
  };

  const filteredTasks: IMock[] = savedTasks.filter((el: IMock) => {
    return el.timeToDo >= range.inputFrom && el.timeToDo <= range.inputTo;
  });

  const handleFilter = () => {
    if (error.inputFrom || error.inputTo) {
      return;
    } else {
      setRenderingTasks(filteredTasks);
    }
  };

  return (
    <div className={styles.filterByTime}>
      <h4>Filter by time</h4>
      <div className={styles.labels}>
        <label htmlFor="rangeFrom">From</label>
        <label htmlFor="rangeTo">To</label>
      </div>
      <div className={styles.inputRangeContainer}>
        <TextField 
          className={classNames(styles.inputRange, styles.from)}
          id="rangeFrom" 
          name="inputFrom"
          value={range.inputFrom}
          onChange={handleChange}
          error={error.inputFrom}
          helperText={helperText.inputFrom}
        />
        <TextField 
          className={classNames(styles.inputRange, styles.to)}
          id="rangeTo"    
          name="inputTo" 
          value={range.inputTo}
          onChange={handleChange}
          error={error.inputTo}
          helperText={helperText.inputTo}
        />
        <Button variant="outlined" onClick={handleFilter}>Filter</Button>
      </div>
    </div>
  );
};

export default FilterByTime;