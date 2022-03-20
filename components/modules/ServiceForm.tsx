/**
 * This is the Core Service Form Component. Which is used to create and send new forms. And to display exisitng forms to be edited
 *
 */

import { useForm, useFormState, useWatch } from "react-hook-form";
import FormSectionModel from "../../models/FormSectionModel";
import FormSection from "../layouts/FormSection";
import InputComponent from "./InputComponent";
import { useEffect, useReducer, useState } from "react";
import BottomNavSubmissionNew from "../elements/BottomNavSubmissionNew";
import BottomNavLayout from "../layouts/BottomNavLayout";
import BaseContainer from "../layouts/BaseContainer";
import Heading from "../elements/Heading";
import BottomNavSubmissionSingle from "../elements/BottomNavSubmissionSingle";
import ClientOnlyPortal from "../layouts/ClientOnlyPortal";
import { useRouter } from "next/router";
import { arraysEqual } from "../../config/helpers";
import SectionCompletedDisplayModel from "../../models/SectionCompletedDisplayModel";
import ResponseModal from "../elements/ResponseModal";
import ModalModel from "../../models/ModalModel";

const ServiceForm: React.FC<{
  formId: string;
  title: string;
  formSections: FormSectionModel[];
  formData?: any;
  editMode?: boolean;
  documentId?: string;
}> = (props) => {
  /* Initialize Success/Error Modal Controls */
  const [modalDetailsState, setModalDetailsState] = useState(new ModalModel());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = (
    type: "success" | "error" | "warning" | "info" | "none",
    visible: boolean = !isModalOpen
  ) => {
    visible
      ? setIsModalOpen((currentModalState) => {
          currentModalState = true;
          setModalDetailsState((currentModalDetailsState) =>
            currentModalDetailsState.open(
              type == "error"
                ? "Error"
                : type == "success"
                ? "Success"
                : "Information",
              type == "error"
                ? "Error Processing the Request"
                : type == "success"
                ? "Your Submission has been saved"
                : "",
              type,
              { title: "Submit a new response", url: "" },
              { title: "View Submissions", url: "/submissions" }
            )
          );
          return currentModalState;
        })
      : setIsModalOpen((currentModalState) => {
          currentModalState = false;
          setModalDetailsState((currentModalDetailsState) => {
            return currentModalDetailsState.close();
          });
          return currentModalState;
        });
  };

  /*--------------------------------------*/

  /* ------------- Initialize Form Controls------------------ */
  /* Below form controls consist of 3 components 
1. Component that identifies the input field currently active in the form so that targeted operations can be done to it
2. Component that keeps track of individual fields to check its validity. As checking validity is requred in realtime for the section progress tabs in the bottom navigation
3. Component that keeps track of each completed section whos values will be passed to the bottom Navigation
*/

  //1. Initialize Component that identifies currently active input field
  const [activeInputField, setActiveInputField] = useState("");

  //2. Initialize Component that keeps track of individual fields to check its validity

  //Note: below fields are purposely typed 'any' because the incoming form fields are dynamic and not known at compile time
  const [formInputStatuses, setInputStatuses] = useState(
    //for each form section
    props.formSections.map((section) => {
      //get the validity of each field in each section. Optional inputs are not checked for validity
      const singleFormSectionArray = section.formInputs.map((input) => {
        return {
          [input.id]: { isValid: !input.required },
        };
      });

      //create an object array that contains the validity of each field in each section
      const defaultValuesSection: any = {};
      singleFormSectionArray.forEach((singleFormSection) => {
        defaultValuesSection[Object.keys(singleFormSection)[0]] = {
          ...Object.values(singleFormSection)[0],
        };
      });
      return defaultValuesSection;
    })
  );

  //3. Initialize component that keeps track of each completed section whos values will be passed to the bottom Navigation
  const completedDisplayModel: SectionCompletedDisplayModel[] = [];
  props.formSections.forEach((section) => {
    completedDisplayModel.push(
      new SectionCompletedDisplayModel(section.title, false)
    );
  });

  const [formSectionCompletedIndicator, setFormSectionCompletedIndicator] =
    useState<SectionCompletedDisplayModel[]>(completedDisplayModel);

  /* ---------------------------------------------------------- */

  /* ------------- Function to Reset the form------------------ */
  const resetAllValues = () => {
    //reset values of formInputStatuses to false except non-requred values (This is 2nd compoennt above)
    setInputStatuses(
      props.formSections.map((section) => {
        //map form section values
        const singleFormSectionArray = section.formInputs.map((input) => {
          return {
            [input.id]: { isValid: !input.required },
          };
        });

        const defaultValuesSection: any = {};
        singleFormSectionArray.forEach((singleFormSection) => {
          defaultValuesSection[Object.keys(singleFormSection)[0]] = {
            ...Object.values(singleFormSection)[0],
          };
        });
        //re-run and return component 2. These similar functions will be made into a single function call later
        return defaultValuesSection;
      })
    );

    //reset values of completed sections tracker (component 3) to false
    setFormSectionCompletedIndicator(
      props.formSections.map((section) => {
        return new SectionCompletedDisplayModel(section.title, false);
      })
    );

    //reset the hook-form component and clear any errors
    reset();
    clearErrors();
  };

  /* ---------------------------------------------------------- */

  /* ------------- Initialize the Hook form components. Destructure needed variables------------------ */
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    setError,
    watch,
    clearErrors,
    reset,
  } = useForm({ mode: "onChange" });

  const { errors, dirtyFields, touchedFields } = useFormState({
    control,
  });

  /* ---------------------------------------------------------- */

  /* ------------- Check active form Validity on every form refresh. And do the ncessary operations to set validity state to true and completed sections on bottom nav------------------ */
  useEffect(() => {

    //check if active field is in the error array returned by the hook form. If not do a valid check
    if (!errors[activeInputField]) {
      
      formInputStatuses.forEach((formInputStatus, index) => {

        //set the active field id to valid
        if (
          formInputStatus[activeInputField] &&
          !formInputStatus[activeInputField].isValid
        ) {
          
          formInputStatus[activeInputField].isValid = true;

          //update the results
          setInputStatuses((currentFormInputStatus) => {
            currentFormInputStatus[index][activeInputField].isValid = true;

            return currentFormInputStatus;
          });

          //check if all form inputs are valid. If so then set the section as valid and completed (Component 3 from above)
          const allFormInputsValid = Object.keys(formInputStatus).every(
            (formInputStatusKey) => {
              return formInputStatus[formInputStatusKey].isValid;
            }
          );

          //set corresponding form section completed indicator to true if all form inputs are valid
          allFormInputsValid &&
            setFormSectionCompletedIndicator(
              (currentFormSectionCompletedIndicator) => {
                currentFormSectionCompletedIndicator[index].completed =
                  allFormInputsValid;
                return currentFormSectionCompletedIndicator;
              }
            );
        }
      });
    } else {

      //if active form field is in the error array then set the active field to invalid
      formInputStatuses.forEach((formInputStatus, index) => {
        //if field id is found, set the field to invalid
        if (
          formInputStatus[activeInputField] &&
          formInputStatus[activeInputField].isValid
        ) {
          setInputStatuses((currentFormInputStatus) => {
            currentFormInputStatus[index][activeInputField].isValid = false;
            return currentFormInputStatus;
          });

          //turn the validity off for that particular form section
          setFormSectionCompletedIndicator(
            (currentFormSectionCompletedIndicator) => {
              currentFormSectionCompletedIndicator[index].completed = false;
              return currentFormSectionCompletedIndicator;
            }
          );
        }
      });
    }
  });


/*----------------------------------------------------------------------*/

/* Below is the handler passed to all input elements. this handler is used to set the current active input field */
  const changedFieldValidationHandler = (
    fieldId: string,
    e?: React.FocusEvent<HTMLButtonElement>
  ) => {
    setActiveInputField(fieldId);
  };


  /* ---------------------------------------------------------- */

  /* ------------- Networking Functions
  1. submitformhandler to submit a new form
  2. Cancel Form Handler to cancel editing a form
  3. Function that send the edit call for existing forms
  ----------------- */
  const router = useRouter();

  //TODO: Move below function to NEXTJS API
  const submitNewFormHandler = (data: any) => {
    const valuesToDb = {
      "service-id": props.formId,
      "service-type": props.title,
      date: Date.now(),
      ...data,
    };

    fetch("/api/submitform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(valuesToDb),
    }).then((res) => {
      const resJson = res.json();
      if (res.ok) {
        resJson.then((res) => {
          //reset all values after timeout
          setTimeout(() => {
            resetAllValues();
          }, 300);
          toggleModal("success", true);
        });
      } else {
        resJson.then((res) => {
          toggleModal("error", true);
        });
      }
    });
  };

  const cancelFormHander = () => {
    router.replace("/submissions");
  };

  const editFormHandler = (data: any) => {
    const differenceObjects: any = {};

    for (const k in data) {
      try {
        if (Array.isArray(data[k])) {
          if (!arraysEqual(data[k], props.formData[k])) {
            differenceObjects[k] = data[k];
          }
        } else {
          if (data[k] !== props.formData[k]) {
            differenceObjects[k] = data[k];
          }
        }
      } catch (e) {}
    }

    fetch("/api/updateform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documentId: props.documentId,
        differenceObjects: differenceObjects,
      }),
    }).then((res) => {
      const resJson = res.json();
      if (res.ok) {
        resJson.then((res) => {
          toggleModal("success", true);
        });
      } else {
        resJson.then((res) => {
          resetAllValues();
          toggleModal("error", true);
        });
      }
    });
  };

  /* ---------------------------------------------------------- */
  return (
    <>
      <BaseContainer>
        <Heading heading={props.title} />
        <form onSubmit={handleSubmit(submitNewFormHandler)} action="">
          <div className="divide-y divide-black gap-y-10">
            {props.formSections.map((formSection, index) => {
              return (
                <FormSection key={formSection.slug} title={formSection.title}>
                  {formSection.formInputs.map((input, index) => {
                    const formData = props.formData?.[input.id] ?? "";

                    return (
                      <InputComponent
                        formId={props.formId}
                        inputValues={input}
                        register={register}
                        getValues={getValues}
                        setValue={setValue}
                        setError={setError}
                        onChangeFieldValidationHandler={
                          changedFieldValidationHandler
                        }
                        clearErrors={clearErrors}
                        key={input.id}
                        formData={formData}
                        control={control}
                      />
                    );
                  })}
                </FormSection>
              );
            })}
          </div>
        </form>
      </BaseContainer>

{/* -------------------Set Bottom Nav in the portals set in the Base Container-------------------- */}
      <ClientOnlyPortal selector="#portal-bottom-nav">
        <BottomNavLayout>
          {props.editMode && (
            <BottomNavSubmissionSingle
              cancelFormHandler={cancelFormHander}
              editFormHandler={handleSubmit(editFormHandler)}
            />
          )}
          {!props.editMode && (
            <BottomNavSubmissionNew
              sectionCompletedIndicators={formSectionCompletedIndicator}
              reset={resetAllValues}
              onSubmit={handleSubmit(submitNewFormHandler)}
            />
          )}
        </BottomNavLayout>
      </ClientOnlyPortal>
      {/* -------------------Set Modals portals set in the Base Container-------------------- */}
      <ClientOnlyPortal selector="#portal-modal">
        <ResponseModal
          isModalOpen={isModalOpen}
          modalState={modalDetailsState}
          toggleModal={toggleModal}
        />
      </ClientOnlyPortal>
    </>
  );
};

export default ServiceForm;
