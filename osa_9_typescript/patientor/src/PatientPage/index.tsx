import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue, updatePatient } from "../state";
import { toNewPatientEntry } from "../utils";
import { InvalidPatientError } from "../errorHandler/error";
import EntryDetails from "../PatientListPage/EntryDetails";

const getGenderIcon = {
  male: "mars" as "mars",
  female: "venus" as "venus",
  other: "genderless" as "genderless",
};

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
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
      try {
        if (patient && !patient["ssn"]) {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${patient.id}`
          );
          dispatch(updatePatient(patientFromApi));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [dispatch, patient]);

  if (!patient || !patient["ssn"])
    return <div>Loading patient information...</div>;

  if (!patient) {
    return <div>No patient found</div>;
  }

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
        <br></br>
        <h3>entries</h3>
        {patient.entries?.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </Container>
    </div>
  );
};

export default PatientPage;
