/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, Entry, Patient } from "./types";
import { InvalidPatientError } from "../src/errorHandler/error";

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

// parsing Id
const parseId = (id: any): string => {
  if (!id || !isString(id)) {
    throw new Error("Incorrect or missing param: " + parseId);
  }
  return id;
};

// parsing Occupation
const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation" + occupation);
  }
  return occupation;
};

// parsing Ssn
const parseSsn = (param: any, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new InvalidPatientError("Incorrect or missing: " + paramName);
  }
  return param;
};

// parsing Date
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// parsing Gender
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

// parsing Entries
const parseEntries = (entries: any): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error("Incorrect or missing gender: " + entries);
  }
  return entries;
};

export const toNewPatientEntry = (object: any): Patient => {
  return {
    id: parseId(object.id),
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn, "ssn"),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries),
  };
};
