import React, { useEffect } from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient, Gender } from "../types";
import { useStateValue } from "../state";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useStateValue();
  let patient = state.patients[id];

  const updatePatient = async () => {
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    dispatch({ type: "UPDATE_PATIENT", payload: data });
    patient = { ...data };
  };
  useEffect(() => {
    if (patient && !patient.ssn) {
      updatePatient();
    }
  });

  if (!patient) {
    return null;
  }

  const getGenderIcon =
    patient.gender === Gender.Female
      ? "venus"
      : patient.gender === Gender.Male
      ? "mars"
      : "genderless";

  return (
    <div className="App">
      <Container>
        <h2>
          {patient.name} <Icon name={getGenderIcon} />
        </h2>
        <>ssn: {patient.ssn} </>
        <br></br>
        <>occupation: {patient.occupation} </>
        <br></br>
        <>date of birth: {patient.dateOfBirth}</>
      </Container>
    </div>
  );
};

export default PatientPage;
