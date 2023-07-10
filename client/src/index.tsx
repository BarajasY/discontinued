/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Routes, Route } from "@solidjs/router";
import { QueryClientProvider, QueryClient } from "@tanstack/solid-query";
import "./styles/index.module.css";
import Home from "./components/Home";
import Year from "./components/Year";
import All from "./components/All";
import Make from "./components/Make";

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
          <Route path="/make" component={Make} />
          <Route path="/all" component={All} />
        </Routes>
      </Router>
    </QueryClientProvider>
  ),
  root!
);
