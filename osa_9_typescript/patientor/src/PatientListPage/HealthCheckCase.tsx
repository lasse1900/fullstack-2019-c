import React from "react";
import { HealthCheckEntry } from "../types";
import { Segment, Icon } from "semantic-ui-react";
import HealthRatingBar from "../components/HealthRatingBar";
import DiagnosisCodes from "./DiagnosesCodes";

const HealthCheckCase: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Segment>
      <h2>
        {entry.date} <Icon name="doctor" />
      </h2>
      <p style={{ fontStyle: "italic" }}>{entry.description}</p>
      <DiagnosisCodes entry={entry} />
      <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
    </Segment>
  );
};

export default HealthCheckCase;