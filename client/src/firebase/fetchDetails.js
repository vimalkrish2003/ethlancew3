//create a function to fetch project details from firebase
import {db} from "./firebaseConfig";
import {getDocs,collection} from "firebase/firestore";
export async function fetchProjectDetails(){
    try {
        const projects = [];
        const querySnapshot = await getDocs(collection(db, "projects"));
        querySnapshot.forEach((doc) => {
            projects.push(doc.data());
        });
        return projects;
    } catch (error) {
        console.error("Error fetching projects: ", error);
        // You can decide how to handle the error here, for example, you might want to return an empty array
        return [];
    }
}
    