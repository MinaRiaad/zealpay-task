import React from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Categories = ({
  category,
  categories,
  difficulty,
  numberOfCategories,
  handleChangeCategory,
  handleChangeNumberOfCategories,
}) => {
  const navigate = useNavigate();

  const handleStart = () => {
    handleChangeNumberOfCategories(numberOfCategories + 1);
    navigate(`/question`);
  };

  if (!difficulty) return navigate("/welcome");

  return (
    <div className="root">
      <div className="categories-container">
        <Grid container justifyContent="center" spacing={4}>
          <Grid item xs={12}>
            <div className="sub-container">
              <p>Questions Category</p>
            </div>
          </Grid>
          {[{ id: 0, name: "Random" }, ...categories].map((item) => (
            <Grid item xs={12} md={4} key={item.id}>
              <div
                className="category-container"
                onClick={() => handleChangeCategory(item)}
                style={{
                  background: category.id === item.id ? "#f2f2f2" : "",
                }}
              >
                {item.name}
              </div>
            </Grid>
          ))}
          <Grid item xs={12}>
            <div className="sub-container">
              <button
                className="start-button"
                onClick={handleStart}
                disabled={!category}
              >
                START
              </button>
            </div>
          </Grid>
        </Grid>
      </div>
      {/* <div className="shortcuts-container bottom">
        <p className="shortcut-text">Start</p>
      </div> */}
    </div>
  );
};

export default Categories;
