import BottomNavSubmissionNew from "../elements/BottomNavSubmissionNew";
import Heading from "../elements/Heading";
import BaseContainer from "../layouts/BaseContainer";
import BottomNavLayout from "../layouts/BottomNavLayout";
import AuthForm from "../modules/AuthForm";
import BaseTemplate from "./BaseTemplate";
import ServiceForm from "../modules/ServiceForm";
import ServiceFormModel from "../../models/ServiceFormModel";
import { format } from "path";

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
