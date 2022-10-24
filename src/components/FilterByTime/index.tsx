import { FC, useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { Button, TextField } from "@mui/material";
import styles from "./FilterByTime.module.scss";
import classNames from "classnames";
import { IMock } from "../../types/IMock";

interface IFilterByTimeProps {
  setRenderingTasks: Dispatch<SetStateAction<IMock[]>>;
  savedTasks: IMock[];
}

const FilterByTime: FC<IFilterByTimeProps> = ({ setRenderingTasks, savedTasks }) => {
  const taskTimes = savedTasks.map((el: IMock) => el.timeToDo);
  
  const taskMinTime = Math.min(...taskTimes);
  const taskMaxTime = Math.max(...taskTimes);

  const [inputFrom, setInputFrom] = useState<number>(taskMinTime);
  const [inputTo, setInputTo] = useState<number>(taskMaxTime);

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputFrom(Number(e.target.value));
  };
  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTo(Number(e.target.value));
  };

  const filteredTasks: IMock[] = savedTasks.filter((el: IMock) => {
    return el.timeToDo >= inputFrom && el.timeToDo <= inputTo;
  });

  const filterTasks = () => {
    setRenderingTasks(filteredTasks);
  };

  return (
    <div className={styles.filterByTime}>
      <h4>Filter by time</h4>
      <div className={styles.inputRangeContainer}>
        <div className={classNames(styles.inputRange, styles.from)}>
          <label htmlFor="rangeFrom">From</label>
          <TextField 
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
            className={styles.inputFrom}
            id="rangeFrom" 
            defaultValue={inputFrom}
            onChange={handleMinChange}
          />
        </div>
        <div className={classNames(styles.inputRange, styles.to)}>
          <label htmlFor="rangeTo">To</label>
          <TextField 
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
            className={styles.inputTo}
            id="rangeTo"     
            defaultValue={inputTo}
            onChange={handleMaxChange}
          />
        </div>
        <Button variant="outlined" onClick={filterTasks}>Filter</Button>
      </div>
    </div>
  );
};

export default FilterByTime;