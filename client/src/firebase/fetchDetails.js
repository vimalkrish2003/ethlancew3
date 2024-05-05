//create a function to fetch project details from firebase
import {db} from "./firebaseConfig";
import {getDocs,collection} from "firebase/firestore";
export async function fetchProjectDetails(){
    try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projects = querySnapshot.docs.map(doc => ({
            id: doc.id, // This is the document ID
            ...doc.data() // This is the document data
        }));
        return projects;
    } catch (error) {
        console.error("Error fetching projects: ", error);
        // You can decide how to handle the error here, for example, you might want to return an empty array
        return [];
    }
}
    