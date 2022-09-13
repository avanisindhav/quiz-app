import { MouseEvent } from "react";
import { AnswerObject } from "../App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

interface AppProps {
  question: string;
  options: string[]; //[string, string, string, string];
  callback: (e: MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNo: number;
  totalQuestions: number;
}

const QuestionCard = ({
  question,
  options,
  callback,
  userAnswer,
  questionNo,
  totalQuestions,
}: AppProps): JSX.Element => {
  console.log({
    question,
    options,
    callback,
    userAnswer,
    questionNo,
    totalQuestions,
  });
  return (
    <Wrapper>
      <p className="number">
        Question : {questionNo} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {options.map((option, index) => (
          <ButtonWrapper
            key={option}
            correct={userAnswer?.correctAnswer === option}
            userClicked={userAnswer?.userAnswer === option}
          >
            <button
              // key={index}
              disabled={!!userAnswer}
              onClick={callback}
              value={option}
            >
              <span dangerouslySetInnerHTML={{ __html: option }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
