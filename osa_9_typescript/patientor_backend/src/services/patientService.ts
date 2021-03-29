import { v4 as uuid } from "uuid";
import patients from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";

const getEntries = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => {
      return { id, name, dateOfBirth, gender, occupation, entries };
    }
  );
};

const getSingleEntry = (id: any): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    ...patient,
    id: uuid(),
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addPatient,
  getSingleEntry
};