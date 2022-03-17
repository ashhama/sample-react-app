import db from "../../config/firebase";
import { collection, addDoc,updateDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

async function handler(req: any, response: any) {
  if (req.method == "POST") {
    const data = req.body.differenceObjects;
    const documentId = req.body.documentId;

    try {
      
      
      const documentRef = doc(db, "forms", documentId);

      // Set the "capital" field of the city 'DC'
      const result = updateDoc(documentRef, data);

      response.status(200).send({
        message: "Data has been added",
      });
    } catch (e) {
      response.status(400).send({
        message: "Unable to add data",
      });
    }

  }
}

export default handler;