import { MouseEvent, useState } from "react";
import { fetchQuizQuestions, Difficulty, QuestionsState } from "./API";

import QuestionCard from "./components/QuestionCard";

//styles
import { GlobalStyle, Wrapper } from "./App.styles";
const TOTAL_QUESTIONS = 10;

export interface AnswerObject {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  correct: boolean;
}

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  //code for trigger trivia api
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    //TODO error handling

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  //to check answer when user submit answer
  const checkAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if (correct) {
        setScore((prev) => prev + 1);
      }

      const userAnswer = {
        question: questions[number].question,
        userAnswer: answer,
        correctAnswer: questions[number].correct_answer,
        correct: correct,
      };
      console.log({ userAnswer });
      setUserAnswers((prev) => [...prev, userAnswer]);
    }
    // // console.log(e.)
  };

  const nextQuestionClickHandler = () => {
    if (number + 1 === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(number + 1);
    }
  };

  // const gameOverHandler = () => {
  //   setGameOver(true);
  // };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {gameOver ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {<p className="score">Score:{score}</p>}
        {loading ? <p>Loading Questions .... </p> : null}

        {/* {!loading && questions[number + 1] && ( */}
        {!loading && !gameOver && (
          <QuestionCard
            question={questions[number].question}
            options={questions[number].options}
            callback={checkAnswer}
            userAnswer={userAnswers[number] ? userAnswers[number] : undefined}
            questionNo={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
          />
        )}

        {userAnswers.length === number + 1 && questions.length && !gameOver ? (
          <button className="next" onClick={nextQuestionClickHandler}>
            Submit
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;

/*
 // */
