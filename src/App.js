import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Welcome from "src/Pages/Welcome/index";
import Categories from "src/Pages/Categories";
import Question from "src/Pages/Question";
import Score from "src/Pages/Score";

import "./App.scss";
import { useEffect, useState } from "react";
import { fetchCategories } from "./API";

function App() {
  const [categories, setCategories] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [time, setTime] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [numberOfCategories, setNumberOfCategories] = useState(0);
  const [stats, setStats] = useState({});
  const [score, setScore] = useState({ correct: 0, incorrect: 0, skipped: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchCategories();
      setCategories(data.trivia_categories);
    };
    fetchData();
  }, [difficulty]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
  });

  const handleKeyDown = (event) => {
    if (event?.target?.type !== "text") {
      if (event.keyCode === 69) {
        handleChangeDifficulty("easy");
      } else if (event.keyCode === 77) {
        handleChangeDifficulty("medium");
      } else if (event.keyCode === 72) {
        handleChangeDifficulty("hard");
      } else if (event.keyCode === 74) {
        handleChangeDifficulty("hard");
      }
    }
  };

  const handleChangeDifficulty = (value) => {
    setDifficulty(value);
  };

  const handleChangeCategory = (category) => {
    setCategory(category);
  };

  const handleChangePlayerName = (event) => {
    setPlayerName(event.target.value);
  };

  const handleChangeNumberOfQuestions = (number) => {
    setNumberOfQuestions(number);
  };

  const handleChangeNumberOfCategories = (number) => {
    setNumberOfCategories(number);
  };

  const handleChangeTime = (time) => {
    setTime((prev) => [...prev, time]);
  };

  const handleChangeScore = (score) => {
    setScore(score);
  };

  const handleChangeStats = (data) => {
    setStats(data);
  };

  const handleChangeCategories = (data) => {
    setCategories(data);
  };

  const handleResetGame = () => {
    setDifficulty("");
    setCategory("");
    setPlayerName("");
    setTime([]);
    setNumberOfQuestions(0);
    setNumberOfCategories(0);
    setStats({});
    setScore();
    setCategories([]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/welcome"
          element={
            <Welcome
              playerName={playerName}
              difficulty={difficulty}
              handleChangeDifficulty={handleChangeDifficulty}
              handleChangePlayerName={handleChangePlayerName}
            />
          }
        />
        <Route
          path="/categories"
          element={
            <Categories
              category={category}
              categories={categories}
              difficulty={difficulty}
              numberOfCategories={numberOfCategories}
              handleChangeCategory={handleChangeCategory}
              handleChangeNumberOfCategories={handleChangeNumberOfCategories}
            />
          }
        />
        <Route
          path="/question"
          element={
            <Question
              time={time}
              score={score}
              stats={stats}
              category={category}
              difficulty={difficulty}
              numberOfCategories={numberOfCategories}
              numberOfQuestions={numberOfQuestions}
              categories={categories}
              handleChangeScore={handleChangeScore}
              handleChangeTime={handleChangeTime}
              handleChangeStats={handleChangeStats}
              handleChangeCategories={handleChangeCategories}
              handleChangeNumberOfQuestions={handleChangeNumberOfQuestions}
            />
          }
        />
        <Route
          path="/score"
          element={
            <Score
              score={score}
              time={time}
              stats={stats}
              playerName={playerName}
              handleResetGame={handleResetGame}
            />
          }
        />
        <Route path="*" element={<Navigate to="/welcome" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
