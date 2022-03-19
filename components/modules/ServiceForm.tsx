import { useForm, useFormState, useWatch } from "react-hook-form";
import FormSectionModel from "../../models/FormSectionModel";
import FormSection from "../layouts/FormSection";
import InputComponent from "./InputComponent";
import { v4 } from "node-uuid";
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

const ServiceForm: React.FC<{
  formId: string;
  title: string;
  formSections: FormSectionModel[];
  formData?: any;
  editMode?: boolean;
  documentId?: string;
}> = (props) => {
  //below state input fields are typed 'any' because the incoming form fields are dynamic and not known at compile time

  const completedDisplayModel: SectionCompletedDisplayModel[] = [];
  props.formSections.forEach((section) => {
    completedDisplayModel.push(
      new SectionCompletedDisplayModel(section.title, false)
    );
  });

  

  const [formSectionCompletedIndicator, setFormSectionCompletedIndicator] =
    useState<SectionCompletedDisplayModel[]>(completedDisplayModel);

  const [activeInputField, setActiveInputField] = useState("");

  const [formInputStatuses, setInputStatuses] = useState(
    props.formSections.map((section) => {
      //set this section completed indicator to false

      //map form section values
      const singleFormSectionArray = section.formInputs.map((input) => {
        return {
          [input.id]: props.formData
            ? props.formData[input.id]
              ? props.formData[input.id]
              : null
            : null,
        };
      });

      const defaultValuesSection: any = {};
      singleFormSectionArray.forEach((singleFormSection) => {
        defaultValuesSection[Object.keys(singleFormSection)[0]] = {
          isValid: false,
        };
      });
      return defaultValuesSection;
    })
  );

  const resetAllValues = () => {
    //reset values of formSectionCompletedIndicator to false
    setFormSectionCompletedIndicator(
      props.formSections.map((section) => {
        return new SectionCompletedDisplayModel(section.title, false);
      })
    );

    //reset values of formInputStatuses to false
    setInputStatuses(
      props.formSections.map((section) => {
        //set this section completed indicator to false

        //map form section values
        const singleFormSectionArray = section.formInputs.map((input) => {
          return {
            [input.id]: null,
          };
        });

        const defaultValuesSection: any = {};
        singleFormSectionArray.forEach((singleFormSection) => {
          defaultValuesSection[Object.keys(singleFormSection)[0]] = {
            isValid: false,
          };
        });
        return defaultValuesSection;
      })
    );

    reset();
    clearErrors();
  };

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

  useEffect(() => {
    //check if field is touched and has error
    if (!errors[activeInputField]) {
      //check for field id in form input status array
      formInputStatuses.forEach((formInputStatus, index) => {
        //if field id is found, set the field to valid
        if (
          formInputStatus[activeInputField] &&
          !formInputStatus[activeInputField].isValid
        ) {
          //below is to only temporarily update the field for proper results to be fetched for allFormInputsValid field
          formInputStatus[activeInputField].isValid = true;

          setInputStatuses((currentFormInputStatus) => {
            currentFormInputStatus[index][activeInputField].isValid = true;

            return currentFormInputStatus;
          });

          //check if all form inputs are valid
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
      //check for field id in form input status array
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
        }
      });
    }

    
  });

  const changedFieldValidationHandler = (
    fieldId: string,
    e?: React.FocusEvent<HTMLButtonElement>
  ) => {
    setActiveInputField(fieldId);
  };

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
          reset();
        });
      } else {
        resJson.then((res) => {
          console.log("error");
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
          console.log("success");
        });
      } else {
        resJson.then((res) => {
          console.log("error");
        });
      }
    });
  };

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
    </>
  );
};

export default ServiceForm;
