import { Component, For, Match } from "solid-js";
import style from "../styles/all.module.css";
import {createQuery} from "@tanstack/solid-query";

const All:Component = () => {
    const fetchAllCars = async () => {
        const data = await fetch("http://localhost:8080/cars")
        const json = await data.json();
        console.log(json)
        return json
    }
    const query = createQuery(() => ["allcars"], fetchAllCars, {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })


  return (
  <div class={style.allContainer}>
    <Match when={query.isLoading}>
        <h1>Loading...</h1>
    </Match>
    <Match when={query.isError}>
        <h1>Error:</h1>
    </Match>
    <Match when={query.isSuccess}>
        <For each={query.data}>
            {(car) => (
                <p>{car.data.name}</p>
            )}
        </For>
    </Match>
  </div>
  );
};

export default All;
