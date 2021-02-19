import React from "react";

interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: CoursePart[];
}

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
