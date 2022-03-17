import { useForm } from "react-hook-form";
import FormSectionModel from "../../models/FormSectionModel";
import FormSection from "../layouts/FormSection";
import InputComponent from "./InputComponent";
import { v4 } from "node-uuid";
import { useEffect } from "react";
import BottomNavSubmissionNew from "../elements/BottomNavSubmissionNew";
import BottomNavLayout from "../layouts/BottomNavLayout";
import BaseContainer from "../layouts/BaseContainer";
import Heading from "../elements/Heading";
import BottomNavSubmissionSingle from "../elements/BottomNavSubmissionSingle";
import ClientOnlyPortal from "../layouts/ClientOnlyPortal";
import { useRouter } from "next/router";
import { arraysEqual } from "../../config/helpers";

const ServiceForm: React.FC<{
  formId: string;
  title: string;
  formSections: FormSectionModel[];
  formData?: any;
  editMode?: boolean;
  documentId?: string;
}> = (props) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {}, [errors]);

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
                <FormSection key={v4()} title={formSection.title}>
                  {formSection.formInputs.map((input, index) => {
                    const formData = props.formData?.[input.id] ?? "";

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
              reset={reset}
              onSubmit={handleSubmit(submitNewFormHandler)}
            />
          )}
        </BottomNavLayout>
      </ClientOnlyPortal>
    </>
  );
};

export default ServiceForm;
