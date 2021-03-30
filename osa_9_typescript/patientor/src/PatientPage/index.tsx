import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Container, Icon, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue, updatePatient } from "../state";
import { toNewPatientEntry } from "../utils";
import { InvalidPatientError } from "../errorHandler/error";
import EntryDetails from "../PatientListPage/EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const getGenderIcon = {
  male: "mars" as "mars",
  female: "venus" as "venus",
  other: "genderless" as "genderless",
};

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const fetchStatus = useRef({ shouldFetch: false, hasFetched: false });
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  let patient = { ...patients[id] };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  try {
    patient = toNewPatientEntry(patient);
  } catch (e) {
    if (e instanceof InvalidPatientError && !fetchStatus.current.hasFetched) {
      fetchStatus.current = { ...fetchStatus.current, shouldFetch: true };
    } else {
      console.error(e);
    }
  }

  const submitNewPatient = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      if (!updatePatient) throw new Error(`Patient with id ${id} not found`);
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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

  if (!patient || !patient["ssn"]) return <>Loading ...</>;
  if (!patient) {
    return <>No patient found</>;
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
        <h3>
          <i>entries:</i>
        </h3>
        {patient.entries?.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewPatient}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </Container>
    </div>
  );
};

export default PatientPage;
