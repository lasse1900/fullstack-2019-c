import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue, updatePatient } from "../state";
import { toNewPatientEntry } from "../utils";
import { InvalidPatientError } from "../errorHandler/error";

const getGenderIcon = {
  male: "mars" as "mars",
  female: "venus" as "venus",
  other: "genderless" as "genderless",
};

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const fetchStatus = useRef({ shouldFetch: false, hasFetched: false });
  let patient = { ...patients[id] };

  try {
    patient = toNewPatientEntry(patient);
  } catch (e) {
    if (e instanceof InvalidPatientError && !fetchStatus.current.hasFetched) {
      fetchStatus.current = { ...fetchStatus.current, shouldFetch: true };
    } else {
      console.error(e);
    }
  }

  useEffect(() => {
    const fetchPatient = async () => {
      fetchStatus.current = { ...fetchStatus.current, shouldFetch: false };
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
        fetchStatus.current = { ...fetchStatus.current, hasFetched: true };
      } catch (e) {
        console.error(e);
      }
    };

    if (fetchStatus.current.shouldFetch) {
      fetchPatient();
    }
    
  }, [dispatch, id]);

  return (
    <div className="App">
      <Container>
        <h2>
          {patient.name} <Icon name={getGenderIcon[patient.gender]} />
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
