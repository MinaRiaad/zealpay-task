import ReactECharts from "echarts-for-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Score = ({ time, score, stats, playerName, handleResetGame }) => {
  const navigate = useNavigate();
  const pieOption = {
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          {
            value: score.correct,
            name: "Correct",
            itemStyle: { color: "#92E19A" },
          },
          {
            value: score.incorrect,
            name: "False",
            itemStyle: { color: "#E78E8E" },
          },
          {
            value: score.skipped,
            name: "Skipped",
            itemStyle: { color: "#858484" },
          },
        ],
      },
    ],
  };

  const barOption = {
    yAxis: {
      type: "value",
    },
    xAxis: {
      type: "category",
      data: Object.keys(stats),
    },
    series: Object.entries(stats).map((el) => {
      return {
        name: el[0],
        type: "bar",
        stack: "total",
        data: [
          { value: el[1].correct, itemStyle: { color: "red" } },
          { value: -el[1].skipped, itemStyle: { color: "green" } },
          { value: -el[1].incorrect, itemStyle: { color: "yellow" } },
        ],
      };
    }),
  };

  const lineOption = {
    xAxis: {
      type: "category",
      data: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: time,
        type: "line",
        smooth: true,
      },
    ],
  };

  const handleClick = () => {
    handleResetGame();
    navigate("/welcome");
  };

  if (time.length === 0) navigate("/welcome");
  return (
    <div className="score-root">
      <p>{playerName}</p>
      <div>
        <div>
          Time
          <strong>
            {Math.trunc(
              time?.reduce((accumulator, curr) => accumulator + curr)
            )}
          </strong>
          Seconds
        </div>
        <ReactECharts
          option={pieOption}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
        />
        <ReactECharts
          option={barOption}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
        />
        <ReactECharts
          option={lineOption}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
        />
      </div>
      <button onClick={handleClick}>New Game</button>
    </div>
  );
};

export default Score;
