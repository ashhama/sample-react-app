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

const ServiceForm: React.FC<{ formId:string , title:string ,formSections: FormSectionModel[] }> = (props) => {
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

  
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
    <BaseContainer>
    <Heading heading={props.title} />
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <div className="divide-y divide-black gap-y-10">
          {props.formSections.map((formSection, index) => {
            return (
              <FormSection key={index} title={formSection.title}>
                {formSection.formInputs.map((input, index) => {
                  return (
                    <InputComponent
                      formId={props.formId}
                      inputValues={input}
                      register={register}
                      getValues={getValues}
                      setValue={setValue}
                      key={input.id}
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
        <BottomNavSubmissionNew onSubmit={handleSubmit(onSubmit)} />
      </BottomNavLayout>
      
    </>
  );
};


export default ServiceForm;
