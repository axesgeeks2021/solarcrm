import React from "react";
import Heading from "../heading/Heading";

import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <>
      <Link to={props.link} state={{id: props.id}} className="card">
        <img
          src="https://getmdl.io/assets/demos/welcome_card.jpg"
          className="card-image"
        />
        {/* <div className="card-title">{props.title}</div> */}
        <div className="card-desc">{props.text}</div>
        <div className="card-actions">
          <button type="button" className="card-action-readMore">
            {props.status}
            <BsFillArrowRightCircleFill />
          </button>
        </div>
      </Link>
    </>
  );
}

export default Card;
