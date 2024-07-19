import {
  createContext,
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction
} from 'react';
import { Employee } from 'types/Employees.types';
import useFetchGet from 'api/useFetchGet';

const GAME_DATA_URL = 'https://namegame.willowtreeapps.com/api/v1.0/profiles';

interface Context {
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  employeersChosen: Employee[];
  getSixEmployees: () => void;
  attempts: number;
  addAttempts: () => void;
  correctAnswers: number;
  addCorrectAnswers: () => void;
  reset: () => void;
}

export const EmployeesContext = createContext<Context>({
  disabled: false,
  setDisabled: () => { },
  employeersChosen: [],
  getSixEmployees: () => { },
  attempts: 0,
  addAttempts: () => { },
  correctAnswers: 0,
  addCorrectAnswers: () => { },
  reset: () => {},
});

type Props = {
  children: JSX.Element
};

const EmployeesProvider = ({ children }: Props) => {
  const [gameData] = useFetchGet(GAME_DATA_URL) as [Employee[]];
  const [employeersChosen, setEmployeersChosen] = useState<Employee[]>([]);
  const currentEmployeeGroupIndex = useRef(0);
  const gameDataSorted = useRef<Employee[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const randomSort = () => {
    gameDataSorted.current.sort(() => 0.5 - Math.random());
  }

  const getSixEmployees = () => {
    const sixEmployees = [...gameDataSorted.current.slice(currentEmployeeGroupIndex.current, currentEmployeeGroupIndex.current + 6)];
    currentEmployeeGroupIndex.current += 6;

    const correctEmployee = Math.floor(Math.random() * 6);
    sixEmployees[correctEmployee].curretEmployee = true;

    setEmployeersChosen(sixEmployees);
  }

  useEffect(() => {
    if (!gameData) {
      return;
    }

    // DOC: some employeers data are coming without data.headshot.url
    gameDataSorted.current = gameData.filter((data) => !!data.headshot.url);
    randomSort()
    
    getSixEmployees();
  }, [gameData]);

  const reset = () => {
    currentEmployeeGroupIndex.current = 0;
    randomSort();
    setAttempts(0);
    setCorrectAnswers(0);
    setDisabled(false);
  }

  const addAttempts = () => setAttempts(attempts + 1);
  const addCorrectAnswers = () => setCorrectAnswers(correctAnswers + 1);

  return (
    <EmployeesContext.Provider value={{
      employeersChosen,
      getSixEmployees,
      disabled,
      setDisabled,
      attempts,
      addAttempts,
      correctAnswers,
      addCorrectAnswers,
      reset,
    }}>
      {children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesProvider;

