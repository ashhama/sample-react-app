/**
 * This is the root element which stores the links.
 *
 */

import LinksContainer from "../layouts/LinksContainer";

const FormsLinkModule: React.FC<{ title: string }> = (props) => {
  return (
    <>
      <LinksContainer>
        <h3 className="mb-6 text-2xl leading-none font-base text-black">
          {props.title}
        </h3>
        <div>{props.children}</div>
      </LinksContainer>
    </>
  );
};

export default FormsLinkModule;
