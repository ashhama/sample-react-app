import { useForm } from "react-hook-form";
import FormSectionModel from "../../models/FormSectionModel";
import InputElement from "../elements/InputElement";
import MultiSelectElement from "../elements/MultiSelectElement";
import SelectElement from "../elements/SelectElement";
import FormColumn from "../layouts/FormColumn";
import FormGrid from "../layouts/FormGrid";
import FormSection from "../layouts/FormSection";
import InputComponent from "./InputComponent";
import { v4 } from "node-uuid";
import { useEffect } from "react";
import BottomNavSubmissionNew from "../elements/BottomNavSubmissionNew";
import BottomNavLayout from "../layouts/BottomNavLayout";
import BaseContainer from "../layouts/BaseContainer";
import Heading from "../elements/Heading";
import db from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore"; 

const ServiceForm: React.FC<{ formId:string , title:string ,formSections: FormSectionModel[], formData?: any, editMode?:boolean }> = (props) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log('errors');
    console.log(errors);
  }, [errors]);

  //TODO: Move below function to NEXTJS API
  const onSubmit = (data: any) => {
    const valuesToDb = { 'service-id': props.formId ,'service-type' : props.title , date: Date.now() , ...data };
    try {
      const docRef = addDoc(collection(db, "forms"), valuesToDb);
      console.log("written");
      reset();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
    <BaseContainer>
    <Heading heading={props.title} />
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <div className="divide-y divide-black gap-y-10">
          {props.formSections.map((formSection, index) => {
            return (
              <FormSection key={v4()} title={formSection.title}>
                {formSection.formInputs.map((input, index) => {
                  const formData = props.formData?.[input.id] ?? ''
                  
                  return (
                    <InputComponent
                      formId={props.formId}
                      inputValues={input}
                      register={register}
                      getValues={getValues}
                      setValue={setValue}
                      key={input.id}
                      formData={formData}
                    />
                  );
                })}
              </FormSection>
            );
          })}
        </div>

      </form>
      </BaseContainer>
      <BottomNavLayout>
        <BottomNavSubmissionNew reset={reset} onSubmit={handleSubmit(onSubmit)} />
      </BottomNavLayout>
      
    </>
  );
};


export default ServiceForm;
