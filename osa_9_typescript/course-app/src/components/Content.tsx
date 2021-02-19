import React from "react";

interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: CoursePart[];
}

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
