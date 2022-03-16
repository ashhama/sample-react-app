const FormGrid: React.FC<{}> = (props) => {

    return <div className='gap-x-6 grid grid-cols-4'>
        {props.children}
    </div>
}
export default FormGrid;