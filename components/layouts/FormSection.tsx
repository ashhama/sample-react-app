/**
 * This denotes a specific form section with its headers and appropriate containers.
 *
 */

import { ReactElement } from "react";
import FormSectionModel from "../../models/FormSectionModel";
import Heading from "../elements/Heading";
import InputComponent from "../modules/InputComponent";
import FormGrid from "./FormGrid";

interface InputSection {
  children: Array<ReactElement<typeof InputComponent>>;
  title: string;
}

const FormSection: React.FC<InputSection> = (props) => {
  //const childrenIds = props.children.map((child) => child.key); -> this code not used now so commented out

  return( 
      <div className="pt-10">
  <Heading subheading={props.title}/>
  <FormGrid>
      {props.children}
      </FormGrid>
      </div>
      );
};

export default FormSection;
