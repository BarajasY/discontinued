import { Component, For, Match, Switch } from "solid-js";
import style from "../styles/all.module.css";
import { createQuery } from "@tanstack/solid-query";
import { CarType } from "../types";

const All: Component = () => {
  const fetchAllCars = async () => {
    const data = await fetch("http://localhost:8080/cars");
    const json = await data.json();
    return json;
  };

  const query = createQuery(() => ["allcars"], fetchAllCars, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <div class={style.allContainer}>
      <h1>All records</h1>
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
                <div class={style.carInfoContainer}>
                  <h1>{car.name}</h1>
                  <h1>{car.year}</h1>
                  <h1>{car.make}</h1>
                </div>
              )}
            </For>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default All;
