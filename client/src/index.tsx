/* @refresh reload */
import {lazy } from "solid-js";
import { render } from "solid-js/web";
import { Router, Routes, Route } from "@solidjs/router";
import { QueryClientProvider, QueryClient } from "@tanstack/solid-query";
import "./styles/index.module.css";
import MakeResult from "./components/MakeResult";
const Home = lazy(() => import("./components/Home"))
const Year = lazy(() => import("./components/Year"))
const All = lazy(() => import("./components/All"))
const Make = lazy(() => import("./components/Make"))
const YearResult = lazy(() => import("./components/YearResult"))

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

const queryclient = new QueryClient();

render(
  () => (
    <QueryClientProvider client={queryclient}>
      <Router>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/year" component={Year} />
          <Route path="/year/:year" component={YearResult} />
          <Route path="/make" component={Make} />
          <Route path="/make/:make" component={MakeResult} />
          <Route path="/all" component={All} />
        </Routes>
      </Router>
    </QueryClientProvider>
  ),
  root!
);
