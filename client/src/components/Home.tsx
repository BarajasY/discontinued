import { Component } from "solid-js"
import style from "../styles/home.module.css";
import {Motion} from "@motionone/solid";


const Home:Component = () => {
  return (
    <div class={style.homeContainer}>
        <Motion.h1
        initial={{opacity: 0, y:30}}
        inView={{opacity: 1, y: 0}}
        transition={{duration: 1}}>Discontinued <span>vehicles</span> through time</Motion.h1>
    </div>
  )
}

export default Home
