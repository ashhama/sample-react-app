import AuthForm from "../modules/AuthForm";
import BaseTemplate from "../templates/BaseTemplate";

const LoginTemplate: React.FC<{}> = (props) => {
  return (
    <BaseTemplate>
      <div className="flex flex-col items-center justify-center w-screen h-full bg-site-gray-100 text-gray-700">
        <AuthForm />
      </div>
    </BaseTemplate>
  );
};

export default LoginTemplate;
