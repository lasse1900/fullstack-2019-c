import { v4 as uuid } from "uuid";
import patients from "../../data/patients";
import patientData from "../../data/patients";
import { NewPatient, Patient } from "../types";


const getEntries = (): Array<Patient> => {
  return patientData;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addPatient,
};
