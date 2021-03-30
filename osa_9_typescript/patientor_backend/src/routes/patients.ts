import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry, toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getSingleEntry(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patientId: string = req.params.id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry = toNewPatientEntry(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const addedEntry = patientService.addEntry(patientId, newEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
