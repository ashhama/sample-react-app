import db from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

async function handler(req: any, response: any) {
  if (req.method == "POST") {
    const data = req.body;

    try {
      const docRef = addDoc(collection(db, "forms"), data);
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
