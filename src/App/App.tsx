import Board from 'pages/Board';
import Home from 'pages/Home';
import Final from 'pages/Final';
import { useState } from 'react';
import { STEPS } from 'constant';

function App() {
  const [step, setStep] = useState<number>(STEPS.HOME)

  const handleChangeStep = (newStep: number) => {
    setStep(newStep);
  }

  return (
    <>
      <Home show={step === STEPS.HOME} onChangeStep={handleChangeStep} />
      <Board show={step === STEPS.BOARD} onChangeStep={handleChangeStep} />
      <Final show={step === STEPS.FINAL} onChangeStep={handleChangeStep} />
    </>
  );
}

export default App;
