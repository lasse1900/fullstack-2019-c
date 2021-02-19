import React from "react";
import { ContentProps } from '../utils/Courses';

const Content: React.FC<ContentProps> = (props) => {
  const { courseParts } = props;
  return (
    <div>
      {courseParts.map((part) => (
        <p key={part.name}>
          {" "}
          {part.name} {part.exerciseCount}{" "}
        </p>
      ))}
    </div>
  );
};

export default Content;
