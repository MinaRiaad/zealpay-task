import axios from "axios";

export const fetchCategories = () => {
  return axios.get("https://opentdb.com/api_category.php");
};

export const fetchQuestions = ({ category = "", difficulty = "easy" }) => {
  return axios.get(
    `https://opentdb.com/api.php?amount=1&category=${
      category.id || ""
    }&difficulty=${difficulty}`
  );
};
