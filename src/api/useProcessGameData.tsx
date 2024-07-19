import { useEffect, useRef, useState } from 'react';
import useFetchGet from './useFetchGet';
import { Employee } from '../types/Employees.types';

const GAME_DATA_URL = 'https://namegame.willowtreeapps.com/api/v1.0/profiles';

export default function useProcessGameData() {
  const [gameData] = useFetchGet(GAME_DATA_URL) as [Employee[]];
  const gameDataSorted = useRef<Employee[]>([]);
  const currentEmployeeGroupIndex = useRef(0);
  const [employeersChosen, setEmployeersChosen] = useState<Employee[]>();

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
    gameDataSorted.current.sort(() => 0.5 - Math.random());

    getSixEmployees();

  }, [gameData]);

  return [employeersChosen, getSixEmployees];
}
