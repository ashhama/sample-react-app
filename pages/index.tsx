import type { NextPage } from "next";

import Image from "next/image";
import BaseTemplate from "../components/templates/BaseTemplate";
import HeroBanner from "../components/elements/HeroBanner";
import Heading from "../components/elements/Heading";
import FormsLinkModule from "../components/modules/FormsLinkModule";
import BaseContainer from "../components/layouts/BaseContainer";
import { serviceForms } from "../config/config";
import FormItem from "../components/elements/FormItem";

const Home: NextPage = () => {
  //get title and slug from serviceForms
  const formLinks = serviceForms.map((form) => {
    return {
      title: form?.title ?? "",
      href: "/form/" + form?.slug ?? "",
    };
  });

  return (
    <>
      <BaseTemplate>
        <HeroBanner imageUrl="/img/hero-banner.jpg" />

        <BaseContainer>
          <Heading
            heading="Welcome"
            subheading="Please choose a form from below for your required purpose"
          />
          <FormsLinkModule title="Forms">
            {formLinks.map((form) => (
              <FormItem key={form.title} {...form} />
            ))}
          </FormsLinkModule>
        </BaseContainer>
      </BaseTemplate>
    </>
  );
};

export default Home;
