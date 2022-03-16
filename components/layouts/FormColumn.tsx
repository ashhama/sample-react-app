const FormColumn: React.FC<{span?:number}> = (props) => {

    const span = props.span || 2;

    return <div className={`col-span-${span}`}>
        {props.children}
    </div>
}
export default FormColumn;