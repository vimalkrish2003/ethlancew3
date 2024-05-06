//create a function to fetch project details from firebase
import {db} from "./firebaseConfig";
import {getDocs, collection, doc, getDoc, query, where} from "firebase/firestore";
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
export async function fetchProjectDetailsById(projectId){
    const docRef = doc(db, "projects", projectId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {
            id: docSnap.id,
            ...docSnap.data()
        };
    } else {
        console.error("No such document");
        return null;
    }
}

export async function fetchProjectDetailsByClient(clientAddress) {
    const querySnapshot = await getDocs(query(collection(db, "projects"), where("clientAddress", "==", clientAddress)));

    if (!querySnapshot.empty) {
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } else {
        console.error("No such document");
        return null;
    }
}

export async function fetchClientDetails(clientAddress) {
    const docRef = doc(db, "clients", clientAddress);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {
            id: docSnap.id,
            ...docSnap.data()
        };
    } else {
        console.error("No such document");
        return null;
    }
}

//function to check if the userAddress is a client or a freelancer
export async function checkUserType(userAddress) {
    const clientDocRef = doc(db, "clients", userAddress);
    const freelancerDocRef = doc(db, "freelancers", userAddress);

    const clientDocSnap = await getDoc(clientDocRef);
    const freelancerDocSnap = await getDoc(freelancerDocRef);

    if (clientDocSnap.exists()) {
        return 'client';
    } else if (freelancerDocSnap.exists()) {
        console.log("freelancer");
        return 'freelancer';
    } else {
        return 'addUser';
    }
}