import { createQuery } from "@tanstack/solid-query";
import { Component, For, Match, Switch } from "solid-js";
import style from "../styles/make.module.css";
import { MakeType } from "../types";
import { A, useNavigate } from "@solidjs/router";

const Make: Component = () => {
    const navigate = useNavigate();

  const getmakes = async () => {
    const data = await fetch("http://localhost:8080/cars/make");
    const json = await data.json();
    return json;
  };

  const query = createQuery(() => ["CarMakers"], getmakes, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <div class={style.makeContainer}>
      <h1>Discontinued by <span>make</span></h1>
      <div class={style.make}>
        <Switch>
          <Match when={query.isLoading}>
            <h1>Loading...</h1>
          </Match>
          <Match when={query.isError}>
            <h1>Error!</h1>
          </Match>
          <Match when={query.isSuccess}>
            <For each={query.data}>
              {(make: MakeType) => <A href={`./${make.make}`}>{make.make}</A>}
            </For>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default Make;
