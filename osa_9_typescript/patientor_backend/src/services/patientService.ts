import { v4 as uuid } from "uuid";
import patients from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient, NewEntry } from "../types";

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

const addEntry = (patientId: string, entry: NewEntry): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  const existingPatient: Patient | undefined = patients.find(
    (p) => p.id === patientId
  );
  if (!existingPatient) {
    throw new Error(`Patient with id '${patientId}' not found`);
  }
  existingPatient.entries.push(newEntry);
  return existingPatient;
};

export default {
  getEntries,
  addPatient,
  getSingleEntry,
  addEntry,
};
