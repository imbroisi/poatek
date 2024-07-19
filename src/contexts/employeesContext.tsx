import {
  createContext,
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction
} from 'react';
import { Employee } from '../types/Employees.types';
import useFetchGet from '../api/useFetchGet';

const GAME_DATA_URL = 'https://namegame.willowtreeapps.com/api/v1.0/profiles';

interface Context {
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  employeersChosen: Employee[];
  getSixEmployees: () => void;
}

export const EmployeesContext = createContext<Context>({
  disabled: false,
  setDisabled: () => {},
  employeersChosen: [],
  getSixEmployees: () => {}
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

  const getSixEmployees = () => {
    const sixEmployees = [...gameDataSorted.current.slice(currentEmployeeGroupIndex.current, currentEmployeeGroupIndex.current + 6)];
    currentEmployeeGroupIndex.current += 6;

    // console.log('-->> sixEmployees', sixEmployees)

    const correctEmployee = Math.floor(Math.random() * 6);
    // console.log('-->> correctEmployee', correctEmployee)

    sixEmployees[correctEmployee].curretEmployee = true;

    setEmployeersChosen(sixEmployees);
  }

  useEffect(() => {
    if (!gameData) {
      return;
    }

    // DOC: some employeers data are coming without data.headshot.url
    gameDataSorted.current = gameData.filter((data) => !!data.headshot.url);
    gameDataSorted.current.sort(() => 0.5 - Math.random());

    getSixEmployees();

  }, [gameData]);


  return (
    <EmployeesContext.Provider value={{
      employeersChosen,
      getSixEmployees,
      disabled,
      setDisabled,
    }}>
      {children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesProvider;

