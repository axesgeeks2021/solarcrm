import React from "react";
import Heading from "./Heading";
import { useNavigate } from "react-router-dom";

import { BsArrowBarLeft, BsArrowLeftShort } from "react-icons/bs";

import Button from "../Button/Button";

function PageHeading(props) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="page__heading">
        <div>
          <button type="button" className="go__back__button" onClick={goBack}>
            <BsArrowLeftShort className="back__icon" />
            Go Back
          </button>
          {/* <Heading heading={props.heading1} size="1.2rem" weight="600" /> */}
        </div>
        <div>
          <Heading heading={props.heading2} size="1.2rem" weight="600" />
        </div>
      </div>
    </>
  );
}

export default PageHeading;
