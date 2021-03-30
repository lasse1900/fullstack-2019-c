/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient,
  Gender,
  Entry,
  NewEntry,
  HospitalEntry,
  NewHospitalEntry,
  HealthCheckEntry,
  NewHealthCheckEntry,
  OccupationalHealthcareEntry,
  NewOccupationalHealthcareEntry,
} from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

// parsing Name
const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }
  return name;
};

// parsing Date
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// parsing Ssn
const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }
  return ssn;
};

// parsing Occupation
const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation" + occupation);
  }
  return occupation;
};

// parsing Gender
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export const toNewPatient = (object: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [],
  };

  return newEntry;
};

const toNewHealthCheckEntry = (
  object: HealthCheckEntry
): NewHealthCheckEntry => {
  if (!object.description) throw new Error(`Missing 'description' value`);
  if (!object.date) throw new Error(`Missing 'date' value`);
  if (!object.specialist) throw new Error(`Missing 'specialist' value`);
  if (object.healthCheckRating === undefined)
    throw new Error(`Missing 'health check rating' value`);

  return object;
};

const toNewOccupationalHealthcareEntry = (
  object: OccupationalHealthcareEntry
): NewOccupationalHealthcareEntry => {
  if (!object.description) throw new Error(`Missing 'description' value`);
  if (!object.date) throw new Error(`Missing 'date' value`);
  if (!object.specialist) throw new Error(`Missing 'specialist' value`);
  if (!object.employerName) throw new Error(`Missing 'employer name' value`);

  return object;
};

const toNewHospitalEntry = (object: HospitalEntry): NewHospitalEntry => {
  if (!object.description) throw new Error(`Missing 'description' value`);
  if (!object.date) throw new Error(`Missing 'date' value`);
  if (!object.specialist) throw new Error(`Missing 'specialist' value`);
  if (!object.discharge) throw new Error(`Missing 'discharge' value`);

  return object;
};

const assertNever = (value: never): never => {
  throw new Error(`Incorrect 'type' value: ${JSON.stringify(value)}`);
};

export const toNewPatientEntry = (entry: Entry): NewEntry => {
  switch (entry.type) {
    case "HealthCheck":
      return toNewHealthCheckEntry(entry);
    case "OccupationalHealthcare":
      return toNewOccupationalHealthcareEntry(entry);
    case "Hospital":
      return toNewHospitalEntry(entry);
    default:
      return assertNever(entry);
  }
};
