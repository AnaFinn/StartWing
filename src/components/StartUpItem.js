import React from "react";
import Avatar from "../components/UIElements/Avatar";
import { Link } from "react-router-dom";
import CardStartUp from "./UIElements/CardStartUp";
import '../styles/StartUpItem.css'

const StartUpItem = (props) => {
  return (
    <li className="start-up__item">
      <CardStartUp className="start-up__content">
        <Link to={`/${props.id}/startup`}>
          <div className="start-up__image">
            <Avatar image={props.image} alt={props.alt} />
          </div>
          <div className="start-up_info">
            <h2>{props.name}</h2>
            <p>{props.text}</p>
          </div>
        </Link>
      </CardStartUp>
    </li>
  );
};

export default StartUpItem;
