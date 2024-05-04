import {setDoc,doc} from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function addClientDetails(details, userAddress) {
  try {
    await setDoc(doc(db, "clients", userAddress), details);
    console.log("Clients details added successfully");
  } catch (error) {
    console.error("Error adding client details: ", error);
  }
}

export async function addFreelancerDetails(details, userAddress) {
  try {
    await setDoc(doc(db, "freelancers", userAddress), details);
    console.log("Freelancer details added successfully");
  } catch (error) {
    console.error("Error adding freelancer details: ", error);
  }
}