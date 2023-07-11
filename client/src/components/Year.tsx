import { Component, createSignal } from "solid-js";
import style from "../styles/year.module.css";
import { useNavigate } from "@solidjs/router";
import { Motion } from "@motionone/solid";

const Year: Component = () => {
  const [YearNumber, setYearNumber] = createSignal(2023);
  const navigate = useNavigate();

  const searchCarsByYear = () => {
    navigate(`./${YearNumber()}`);
  };

  return (
    <div class={style.yearContainer}>
      <Motion.h1 initial={{ opacity: 0, y: 30 }} inView={{ opacity: 1, y: 0 }}>
        State a year
      </Motion.h1>
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        inView={{ opacity: 1, y: 0 }}
        class={style.yearInput}
      >
        <input
          type="text"
          pattern="^[0-9]*$"
          placeholder={YearNumber().toString()}
          onKeyPress={(e) => e.key === "Enter" ? searchCarsByYear() : null}
          onInput={(e) => setYearNumber(Number(e.target.value))}
        />
        <button onClick={() => searchCarsByYear()}>Search</button>
      </Motion.div>
    </div>
  );
};

export default Year;
