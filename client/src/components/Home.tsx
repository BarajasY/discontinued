import { Component } from "solid-js";
import style from "../styles/home.module.css";
import { Motion } from "@motionone/solid";
import { A } from "@solidjs/router";

const Home: Component = () => {
  return (
    <div class={style.homeContainer}>
      <div class={style.homeMain}>
        <Motion.h1
          initial={{ opacity: 0, y: 30 }}
          inView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, easing: "ease-in-out" }}
        >
          Discontinued <span>vehicles</span> through time
        </Motion.h1>
      </div>
      <div class={style.homeApiDoc}>
        <Motion.div
          class={style.homeApiDocContainer}
          initial={{ opacity: 0, y: 30 }}
          inView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, easing: "ease-in-out" }}
        >
          <h1>Use our API to attain information</h1>
          <div class={style.homeApiDocContent}>
            <section>
              <h1>Discontinued cars by</h1>
              <A href="/year">Year</A>
            </section>
            <section>
              <h1>Discontinued cars by</h1>
              <A href="/make">Make</A>
            </section>
          </div>
          <section>
            <h1>Or rather...</h1>
            <A href="/all">Get All Results</A>
          </section>
        </Motion.div>
      </div>
    </div>
  );
};

export default Home;
