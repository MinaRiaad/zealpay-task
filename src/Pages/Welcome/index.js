import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = ({
  playerName,
  difficulty,
  handleChangePlayerName,
  handleChangeDifficulty,
}) => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const levelRef = useRef();

  const handlePlay = () => {
    navigate("/categories");
  };

  return (
    <div className="welcome-container">
      <div className="form-container">
        <input
          type="text"
          placeholder="Player Name"
          ref={inputRef}
          onChange={handleChangePlayerName}
        />
        <div>
          <button
            onClick={() => handleChangeDifficulty("easy")}
            style={{
              background: difficulty === "easy" ? "#f2f2f2" : "",
            }}
          >
            Easy
          </button>
          <button
            onClick={() => handleChangeDifficulty("medium")}
            style={{
              background: difficulty === "medium" ? "#f2f2f2" : "",
            }}
          >
            Medium
          </button>
          <button
            onClick={() => handleChangeDifficulty("hard")}
            style={{
              background: difficulty === "hard" ? "#f2f2f2" : "",
            }}
          >
            Hard
          </button>
        </div>
      </div>
      <button
        className="play-button"
        disabled={!difficulty || !playerName}
        onClick={handlePlay}
      >
        PLAY
      </button>
      <div className="shortcuts-container">
        {/* <div className="shortcut">
          <img src={arrows} alt="arrows" />
          <p>move around</p>
        </div> */}
        <p className="shortcut-text" ref={levelRef}>
          Easy
        </p>
        <p className="shortcut-text" ref={levelRef}>
          Medium
        </p>
        <p className="shortcut-text" ref={levelRef}>
          Hard
        </p>
      </div>
    </div>
  );
};

export default Welcome;
