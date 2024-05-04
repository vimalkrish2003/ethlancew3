import {setDoc,doc} from "firebase/firestore";
import { db } from "./firebaseConfig";
const metamaskAddress='0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B'
export async function addClientDetails(details) {
  try {
    await setDoc(doc(db, "clients", metamaskAddress), details);
    console.log("Clients details added successfully");
  } catch (error) {
    console.error("Error adding client details: ", error);
  }
}

export async function addFreelancerDetails(details) {
  try {
    await setDoc(doc(db, "freelancers", metamaskAddress), details);
    console.log("Freelancer details added successfully");
  } catch (error) {
    console.error("Error adding freelancer details: ", error);
  }
}