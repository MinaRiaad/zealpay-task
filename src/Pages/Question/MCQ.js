import React, { useEffect, useState } from "react";
import { shuffle } from "src/utils";

const MCQ = ({ question, answer, handleChangeAnswer }) => {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    const data = shuffle([
      question.correct_answer,
      ...question.incorrect_answers,
    ]);

    setShuffledAnswers(data);
  }, [question.correct_answer, question.incorrect_answers]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  const handleKeyDown = (event) => {
    if (event?.target?.type !== "text") {
      console.log(event.keyCode);
      if (event.keyCode === 69) {
      } else if (event.keyCode === 77) {
      } else if (event.keyCode === 72) {
      }
      //  else if (event.keyCode === 40) {
      //   handleChangeDifficulty("easy");
      // } else if (event.keyCode === 39) {
      //   if (!difficulty) handleChangeDifficulty("easy");
      //   else if (difficulty === "easy") handleChangeDifficulty("medium");
      //   else if (difficulty === "medium") handleChangeDifficulty("hard");
      // } else if (event.keyCode === 37) {
      //   if (difficulty === "medium") handleChangeDifficulty("easy");
      //   if (difficulty === "hard") handleChangeDifficulty("medium");
      // }
    }
  };

  return (
    <>
      <div className="question-container">
        <p>{question.question}</p>
        <div>
          {shuffledAnswers.map((item, index) => (
            <div
              key={item}
              style={{
                background: item === answer ? "#f2f2f2" : "",
              }}
              onClick={() => handleChangeAnswer(item)}
            >
              <div>{index + 1}</div>
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MCQ;
