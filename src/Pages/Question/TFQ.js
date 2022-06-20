import React from "react";

const TFQ = ({ question, answer, handleChangeAnswer }) => {
  return (
    <>
      <div className="question-container">
        <p>{question.question}</p>
        <div>
          <div
            onClick={() => handleChangeAnswer("True")}
            style={{
              background: answer === "True" ? "#f2f2f2" : "",
            }}
          >
            <div>T</div>True
          </div>
          <div
            onClick={() => handleChangeAnswer("False")}
            style={{
              background: answer === "False" ? "#f2f2f2" : "",
            }}
          >
            <div>F</div>False
          </div>
        </div>
      </div>
    </>
  );
};

export default TFQ;
