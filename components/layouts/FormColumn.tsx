/**
 * This is the form column component. Do note that the col-span-* classes have been ignored in the tailwind purge file so that it can be used in this manner of code
 *
 */

const FormColumn: React.FC<{span?:number}> = (props) => {

    const span = props.span || 2;

    return <div className={`col-span-${span}`}>
        {props.children}
    </div>
}
export default FormColumn;