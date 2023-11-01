import React from "react";

import StartUpList from "../components/StartUpList";

const Browse = (props) => {
  const STARTUPS = [
    {
      id: "su1",
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      text: "Some dummy text to work with",
    },
    {
      id: "su2",
      name: "Sarah Connor",
      image:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      text: "Some dummy text to work with",
    },
    {
      id: "su3",
      name: "Luke Skywalker",
      image:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      text: "Some dummy text to work with",
    },
    {
      id: "su4",
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      text: "Some dummy text to work with",
    },
    {
      id: "su5",
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      text: "Some dummy text to work with",
    },
  ];

  return <StartUpList items={STARTUPS} />;
};

export default Browse;
