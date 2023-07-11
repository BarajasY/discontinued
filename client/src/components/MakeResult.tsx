import { Motion } from "@motionone/solid";
import style from "../styles/all.module.css";
import { Component, For, Match, Switch } from "solid-js";
import { CarType } from "../types";
import { useParams } from "@solidjs/router";
import { createQuery } from "@tanstack/solid-query";

const MakeResult: Component = () => {
    const params = useParams();

    const fetchCarsByMake = async () => {
        const data = await fetch(`http://localhost:8080/cars/make/${params.make}`);
        const json = await data.json();
        return json;
      };

      const query = createQuery(() => ["CarsByMake"], fetchCarsByMake, {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      });

  return (
    <div class={style.allContainer}>
      <div class={style.allWords}>
        <h1>
          Records from year:{" "}
          <Motion.span
            initial={{ opacity: 0, y: 30 }}
            inView={{ opacity: 1, y: 0 }}
            class="yearSpan"
          >
            {params.make}
          </Motion.span>
        </h1>
      </div>
      <div class={style.tableColumns}>
        <h1>Name</h1>
        <h1>Year</h1>
        <h1>Make</h1>
      </div>
      <div class={style.recordsContainer}>
        <Switch>
          <Match when={query.isLoading}>
            <p>Loading...</p>
          </Match>
          <Match when={query.isError}>
            <p>Error: </p>
          </Match>
          <Match when={query.isSuccess}>
            <For each={query.data}>
              {(car: CarType) => (
                <Motion.div
                  initial={{ opacity: 0, y: 30 }}
                  inView={{ opacity: 1, y: 0 }}
                  class={style.carInfoContainer}
                >
                  <h1>{car.name}</h1>
                  <h1>{car.year}</h1>
                  <h1>{car.make}</h1>
                </Motion.div>
              )}
            </For>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default MakeResult;
