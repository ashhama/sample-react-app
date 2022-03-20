/**
 * Main Form Submission Page Template
 *
 */
import BaseTemplate from "./BaseTemplate";
import ServiceForm from "../modules/ServiceForm";
import ServiceFormModel from "../../models/ServiceFormModel";


const FormTemplate: React.FC<{ form: ServiceFormModel }> = (props) => {
  return (
    <>
      <BaseTemplate>
        <ServiceForm
          title={props.form.title}
          formId={props.form.id}
          formSections={props.form.formSections}
        />
      </BaseTemplate>
    </>
  );
};

export default FormTemplate;
