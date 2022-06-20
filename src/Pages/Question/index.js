/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuestions } from "src/API";
import Timer from "src/Components/Timer";
import MCQ from "./MCQ";
import TFQ from "./TFQ";

import { getSpentTime } from "src/utils";

const Question = ({
  score,
  stats,
  category,
  difficulty,
  categories,
  handleChangeTime,
  handleChangeScore,
  handleChangeStats,
  numberOfQuestions,
  numberOfCategories,
  handleChangeCategories,
  handleChangeNumberOfQuestions,
}) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [start, setStart] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(false);
  const [answer, setAnswer] = useState("");

  const fetchData = useCallback(async () => {
    const { data } = await fetchQuestions({ category, difficulty });
    setQuestions(data.results);
  }, [category, difficulty]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setCurrentQuestion(questions[0]);
    setStart(new Date());
  }, [questions]);

  useEffect(() => {
    handleChangeCategories(categories.filter((el) => el.id !== category.id));
  }, []);

  const handleSubmitAnswer = () => {
    handleChangeTime(getSpentTime(start));
    setStart(new Date());

    if (answer && answer === currentQuestion.correct_answer) {
      handleChangeScore({ ...score, correct: score.correct + 1 });
      handleChangeStats({
        ...stats,
        [currentQuestion.category]: {
          correct: stats[currentQuestion.category]
            ? stats[currentQuestion.category].correct + 1
            : 1,
          incorrect: stats[currentQuestion.category]
            ? stats[currentQuestion.category].incorrect
            : 0,
          skipped: stats[currentQuestion.category]
            ? stats[currentQuestion.category].skipped
            : 0,
        },
      });
    } else if (answer && answer !== currentQuestion.correct_answer) {
      handleChangeScore({ ...score, incorrect: score.incorrect + 1 });
      handleChangeStats({
        ...stats,
        [currentQuestion.category]: {
          correct: stats[currentQuestion.category]
            ? stats[currentQuestion.category].correct
            : 0,
          incorrect: stats[currentQuestion.category]
            ? stats[currentQuestion.category].incorrect + 1
            : 1,
          skipped: stats[currentQuestion.category]
            ? stats[currentQuestion.category].skipped
            : 0,
        },
      });
    } else if (!answer) {
      handleChangeScore({ ...score, skipped: score.skipped + 1 });
      handleChangeStats({
        ...stats,
        [currentQuestion.category]: {
          correct: stats[currentQuestion.category]
            ? stats[currentQuestion.category].correct
            : 0,
          incorrect: stats[currentQuestion.category]
            ? stats[currentQuestion.category].incorrect
            : 0,
          skipped: stats[currentQuestion.category]
            ? stats[currentQuestion.category].skipped + 1
            : 1,
        },
      });
    }

    if (numberOfQuestions < 2) {
      setCurrentQuestion(questions[numberOfQuestions + 1]);
      handleChangeNumberOfQuestions(numberOfQuestions + 1);
    } else if (numberOfCategories < 3) {
      navigate("/categories");
      handleChangeNumberOfQuestions(0);
    } else {
      navigate("/score");
      handleChangeNumberOfQuestions(0);
    }

    fetchData();

    handleChangeAnswer("");
  };

  const handleChangeAnswer = (answer) => {
    setAnswer(answer);
  };

  if (!category || !difficulty) return navigate("/welcome");
  if (!currentQuestion) return <p>loading</p>;
  return (
    <>
      <Timer difficulty={difficulty} handleSubmitAnswer={handleSubmitAnswer} />
      <div className="question-root">
        {currentQuestion.type === "multiple" && (
          <MCQ
            answer={answer}
            question={currentQuestion}
            handleChangeAnswer={handleChangeAnswer}
          />
        )}
        {currentQuestion.type === "boolean" && (
          <TFQ
            answer={answer}
            question={currentQuestion}
            handleChangeAnswer={handleChangeAnswer}
          />
        )}
        <div className="skip-next-container">
          <button onClick={handleSubmitAnswer}>Skip</button>
          <button onClick={handleSubmitAnswer}>Next</button>
        </div>
        {/* <div className="shortcuts-container">
          <div className="shortcut">
            <img src={arrows} alt="arrows" />
            <p>Move around</p>
          </div>
          <p className="shortcut-text">Skip</p>
          <p className="shortcut-text">Next</p>
          <div className="tf-question">
            <p className="shortcut-text">T</p>
            <p className="shortcut-text">F</p>
            <p>Answer</p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Question;
