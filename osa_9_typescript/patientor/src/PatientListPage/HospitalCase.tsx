import React from "react";
import { HospitalEntry } from "../types";
import { Segment, Icon } from "semantic-ui-react";
import DiagnosisCodes from "./DiagnosesCodes";

const HospitalCase: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Segment>
      <h2>
        {entry.date} <Icon name="hospital" />
      </h2>
      {entry.description}
      <DiagnosisCodes entry={entry} />
    </Segment>
  );
};

export default HospitalCase;
