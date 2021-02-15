import patientData from "../../data/patients";
import { Patient } from "../types";

const getEntries = (): Array<Patient> => {
  return patientData;
};

const addEntry = (): null => {
  return null;
};

export default {
  getEntries,
  addEntry,
};
