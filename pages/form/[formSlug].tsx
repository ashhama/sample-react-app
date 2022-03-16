import FormTemplate from "../../components/templates/ServiceFormTemplate";
import { useRouter} from "next/router"
import { serviceForms } from "../../config/config";
import { useSelector } from "react-redux";

const FormSingle:React.FC<{
  }> = (props) => {

    const router = useRouter();
    const formSlug = router.query.formSlug;
    const form = serviceForms.find(form => form?.slug === formSlug);
    console.log(form);

    


            

    return ( <>
        {form && <FormTemplate form={form} />}
        
    </>);
};

export default FormSingle;

