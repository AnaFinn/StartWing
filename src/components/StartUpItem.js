import React from "react";
import Avatar from "../components/UIElements/Avatar";
import { Link } from "react-router-dom";
import CardStartUp from "./UIElements/CardStartUp";
import BackIcon from "../assets/back_arr.png";
import carouselData from "../data/carouselData.json";
import Carousel from "./UIElements/Carousel";
import "../styles/StartUpItem.css";

const { slides } = carouselData;
const StartUpItem = (props) => {
  // Check if only one object is passed
  const isSingleObject = !props.id;
  console.log(isSingleObject);

  return (
    <li className={isSingleObject ? "single-object__item" : "start-up__item"}>
      <CardStartUp
        className={
          isSingleObject ? "single-object__content" : "start-up__content"
        }
      >
        {isSingleObject ? (
          <div className="pitch-block">
            <div className="info-block">
              <div className="top-block">
                <Link to={`/browse`}>
                  <img className="back-icon" src={BackIcon} />
                </Link>
                <div className="single-object__image">
                  <Avatar image={props.image} alt={props.alt} />
                </div>
                <div className="single-object__info">
                  <h2>{props.name}</h2>
                  <h4>Founder off the Greens</h4>
                </div>
              </div>
              <div className="mid-block">
                <h3>About {props.name}</h3>
                <p>{props.text}</p>
              </div>
            </div>
            <div className="carousel">
              <Carousel data={slides} />
            </div>
          </div>
        ) : (
          <Link to={`/${props.id}/startup`}>
            <div className="start-up__image">
              <Avatar image={props.image} alt={props.alt} />
            </div>
            <div className="start-up__info">
              <h2>{props.name}</h2>
              <p>{props.text}</p>
            </div>
          </Link>
        )}
      </CardStartUp>
    </li>
  );
};

export default StartUpItem;
