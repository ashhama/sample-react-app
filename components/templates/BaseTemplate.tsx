import MainNavModule from "../modules/MainNavModule";

const BaseTemplate: React.FC<{}> = (props) => {
  return (
    <>
      <MainNavModule />
      <main className="w-screen h-full">{props.children}</main>
    </>
  );
};

export default BaseTemplate;
