import type { NextPage } from "next";
import withAuth from "../../auth/withAuth";
import FormItem from "../../components/elements/FormItem";
import Heading from "../../components/elements/Heading";
import BaseContainer from "../../components/layouts/BaseContainer";
import FormsLinkModule from "../../components/modules/FormsLinkModule";
import BaseTemplate from "../../components/templates/BaseTemplate";
import { serviceForms } from "../../config/config";

const NewSubmissions: NextPage = () => {
  const formLinks = serviceForms.map((form) => {
    return {
      title: form?.title ?? "",
      href: "/form/" + form?.slug ?? "",
    };
  });

  return (
    <BaseTemplate>
      <BaseContainer>
        <Heading
          heading="New Submission"
          subheading="Please choose a form from below for your required purpose"
        />
        <FormsLinkModule title="Forms">
          {formLinks.map((form) => (
            <FormItem key={form.title} {...form} />
          ))}
        </FormsLinkModule>
      </BaseContainer>
    </BaseTemplate>
  );
};

export default withAuth(NewSubmissions);