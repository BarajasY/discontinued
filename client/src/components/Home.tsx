import { Component } from "solid-js";
import style from "../styles/home.module.css";
import { Motion} from "@motionone/solid";
import { A } from "@solidjs/router";

const Home: Component = () => {
  return (
    <div class={style.homeContainer}>
      <div class={style.homeMain}>
        <Motion.h1
          initial={{ opacity: 0, y: 30 }}
          inView={{ opacity: 1, y: 0 }}
          transition={{duration: 1}}
        >
          Discontinued <span>vehicles</span> through time
        </Motion.h1>
      </div>
      <div class={style.homeApiDoc}>
        <div class={style.homeApiDocContainer}>
          <h1>Use our API to attain information</h1>
          <div class={style.homeApiDocContent}>
            <section>
              <h1>Discontinued cars by</h1>
              <A href="/byyear">Year</A>
            </section>
            <section>
              <h1>Discontinued cars by</h1>
              <A href="/bymake">Make</A>
            </section>
          </div>
          <section>
            <h1>Or rather...</h1>
            <A href="/all">Get All Results</A>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
