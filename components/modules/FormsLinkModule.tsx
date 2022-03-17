import FormLinkItem from "../../models/FormLinkModel";
import LinksContainer from "../layouts/LinksContainer";
import FormItem from "../elements/FormItem";

const FormsLinkModule: React.FC<{ title: string }> = (props) => {
  return (
    <>
      <LinksContainer>
        <h3 className="mb-6 text-2xl leading-none font-base text-black">
          {props.title}
        </h3>
        <div>
          {props.children}
            
        </div>
      </LinksContainer>
    </>
  );
};

export default FormsLinkModule;
