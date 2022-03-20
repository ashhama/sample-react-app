/**
 * View All form submissions from this page
 *
 */

import BaseTemplate from "./BaseTemplate";
import { doc, getDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { useEffect, useState } from "react";
import { serviceForms } from "../../config/config";
import ServiceForm from "../modules/ServiceForm";

const SubmissionSingleTemplate: React.FC<{ documentId: string }> = (props) => {
  
  
  const [serviceForm, setServiceForm] = useState(<div>Loading...</div>);

  

  const getFieldValues = async () => {
    const docRef = doc(db, "forms", props.documentId);
    const docSnap = await getDoc(docRef);

    try{
    if (docSnap.exists()) {
      
      const formData = docSnap.data();
      
      const form = serviceForms.find(
        (form) => form?.id === docSnap.data()["service-id"]
      );

      if (form) {
        setServiceForm(
          <ServiceForm
            title={form.title}
            formId={form.id}
            formSections={form.formSections}
            formData={formData}
            editMode={true}
            documentId={props.documentId}
          />
        );
      }
    } else {
      // doc.data() will be undefined in this case
      //handle error
    }
  } catch(error) {
    
  }
  };

  useEffect(() => {
    getFieldValues();
  }, []);

  return (
    <>
      <BaseTemplate>{serviceForm}</BaseTemplate>
    </>
  );
};

export default SubmissionSingleTemplate;
