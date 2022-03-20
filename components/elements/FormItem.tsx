/**
 * Form Link Item as seen in home page to guide user to the forms
 *
 */

import { FileText } from "phosphor-react";
import Link from 'next/link'



const FormItem:React.FC<{ title: string, href: string }> = (props) => {
    return (
        <Link href={props.href}>
        <a className="flex items-center h-8 px-3 text-sm hover:bg-gray-200">
				<FileText color="#007AD2" size={18} />
				<span className="ml-2 leading-none text-site-blue-a100">{props.title}</span>
			</a>
         </Link>
    )
};
export default FormItem;