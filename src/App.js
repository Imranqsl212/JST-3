import { useState, useEffect } from "react";
import "./index.scss";

const questions = [
  {
    title: "React - это ... ?",
    variants: ["библиотека", "фреймворк", "приложение"],
    correct: 0,
  },
  {
    title: "Компонент - это ... ",
    variants: [
      "приложение",
      "часть приложения или страницы",
      "то, что я не знаю что такое",
    ],
    correct: 1,
  },
  {
    title: "Что такое JSX?",
    variants: [
      "Это простой HTML",
      "Это функция",
      "Это тот же HTML, но с возможностью выполнять JS-код",
    ],
    correct: 2,
  },
];

function Result({ res, start }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>
        Вы отгадали {res} из {questions.length}
      </h2>
      <button onClick={start}>Попробовать снова</button>
    </div>
  );
}

function Game({ step, nextStep, correct, setCorrect }) {
  const percent = Math.round((step / questions.length) * 100);
  const currentQuestion = questions[step];

  const checkAnswer = (selectedVariantIndex) => {
    if (selectedVariantIndex === currentQuestion.correct) {
      setCorrect(correct + 1);
    }
    nextStep();
  };

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percent}%` }} className="progress__inner"></div>
      </div>
      <h1>{currentQuestion.title} </h1>
      <ul>
        {currentQuestion.variants.map((variant, index) => {
          return (
            <li
              onClick={() => {
                checkAnswer(index);
              }}
              key={index}
            >
              {variant}
            </li>
          );
        })}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);

  const nextStep = () => {
    setStep(step + 1);
  };
  const start = () => {
    setStep(0);
    setCorrect(0);
  };

  return (
    <div className="App">
      {step === questions.length ? (
        <Result start={start} res={correct} />
      ) : (
        <Game
          correct={correct}
          setCorrect={setCorrect}
          step={step}
          nextStep={nextStep}
        />
      )}
    </div>
  );
}

export default App;
