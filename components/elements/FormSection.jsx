const FormSection = (props) => {

    props.children.map(

        (child) => (
  
          console.log(child)
  
        )
    );

    return (
        <div>
            {props.children}
        </div>
    );
};

export default FormSection;