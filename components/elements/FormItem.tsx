import { FileText } from "phosphor-react";


const FormItem:React.FC<{ title: string, href: string }> = (props) => {
    return (
        <a className="flex items-center h-8 px-3 text-sm hover:bg-gray-200" href={props.href}>
				<FileText color="#007AD2" size={18} />
				<span className="ml-2 leading-none text-site-blue-a100">{props.title}</span>
			</a>
    )
};
export default FormItem;