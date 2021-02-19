import React from "react";
import { ContentProps } from "../utils/Courses";

const Total: React.FC<ContentProps> = (props) => {
  const { courseParts } = props;

  return (
    <>
      Number of exercises{" "}
      {courseParts.reduce((total, part) => total + part.exerciseCount, 0)}
    </>
  );
};

export default Total;
