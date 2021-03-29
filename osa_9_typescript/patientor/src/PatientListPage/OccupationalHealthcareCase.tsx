import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Segment, Icon } from "semantic-ui-react";
import DiagnosisCodes from "./DiagnosesCodes";

const OccupationalHealthcareCase: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <Segment>
      <h2>
        {entry.date} <Icon name="stethoscope" />
        {entry.employerName}
      </h2>
      {entry.description}
      <DiagnosisCodes entry={entry} />
    </Segment>
  );
};

export default OccupationalHealthcareCase;
