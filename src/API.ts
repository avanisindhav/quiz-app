import { shuffleArray } from "./Utils";
export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface QuestionsState extends Question {
  options: string[];
}

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

  const data = await await (await fetch(url)).json();

  return data.results.map((question: Question) => ({
    ...question,
    options: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
