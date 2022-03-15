import FormModel from "../../models/FormModel";
import LinksContainer from "../layouts/LinksContainer";
import FormItem from "../elements/FormItem";

const FormsModule: React.FC<{ title: string, formItems:FormModel[] }> = (props) => {
  return (
    <>
      <LinksContainer>
        <h3 className="mb-6 text-2xl leading-none font-base text-black">
          {props.title}
        </h3>
        <div>
            {props.formItems.map((item) => (
                <FormItem key={item.id} {...item}/>
            ))}
        </div>
      </LinksContainer>
    </>
  );
};

export default FormsModule;
