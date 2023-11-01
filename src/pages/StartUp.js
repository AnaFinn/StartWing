import React from "react";
import StartUpList from "../components/StartUpList";
import Browse from "./Browse";
import { useParams } from "react-router-dom";

import "../styles/StartUp.css";

const STARTUPS = [
  {
    user_id: "su1",
    name: "John Doe",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  },
  {
    user_id: "su2",
    name: "Sarah Connor",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    text: "Some dummy text to work with",
  },
  {
    user_id: "su3",
    name: "Luke SkyWalker",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    text: "Some dummy text to work with",
  },
  {
    user_id: "su4",
    name: "John Doe",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    text: "Some dummy text to work with",
  },
  {
    user_id: "su5",
    name: "John Doe",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    text: "Some dummy text to work with",
  },
];
const StartUp = () => {
  const TEST = [<Browse />];
  //console.log(TEST)
  //.StartUpId specified in the route in teh App.js
  const startUpId = useParams().startUpId;
  const loadedStartUp = STARTUPS.filter((startUp) => startUp.user_id === startUpId);
  //console.log(loadedStartUp);
  return <StartUpList items={loadedStartUp} />;
};

export default StartUp;
