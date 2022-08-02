import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.scss";

export const Home = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [isField, setIsField] = useState(false);
  const [err, setErr] = useState("")

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const startGame = (e) => {
    e.preventDefault()
    if (inputValue.trim().length) {
      console.log(inputValue.trim().length);
      let info = {
        name: inputValue,
        time: null,
        turns: null,
        points: null,
      };

      let allGamer = {
        name: inputValue,
        points: null,
      };

      localStorage.setItem("memoryGame", JSON.stringify(info));
      setIsField(!isField);

      let gameInfo = JSON.parse(localStorage.getItem("allGamer"));

      const localUser = gameInfo?.find((obj) => obj.name == info.name);

      if (!gameInfo) {
        gameInfo = [allGamer];
        localStorage.setItem("allGamer", JSON.stringify(gameInfo));
      } else {
        if (!localUser) {
          gameInfo.push(allGamer);
          localStorage.setItem("allGamer", JSON.stringify(gameInfo));
        }
      }
      navigate("/game");
    }
  };
  return (
    <section className="home">
      <div className="home__container">
        <h1 className="home__title">Memory game</h1>
        <h2 className="home__question">Tell us your name?</h2>
        <form onSubmit={startGame}>
        <input
          type="text"
          placeholder="Enter name"
          className="home__inp"
          onChange={handleChange}
          required
        />
        <button className="home__btn">
          start game
        </button>
        </form>
      </div>
    </section>
  );
};