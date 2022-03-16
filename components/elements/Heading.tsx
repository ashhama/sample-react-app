import React from "react";

const Heading:React.FC<{heading?: string; subheading?: string;}> = (props) => {
    return (
        <>  
            {props.heading &&<h1 className="mb-10 text-4xl leading-none font-medium text-black">{props.heading}</h1>}
            {props.subheading && <h2 className="mb-10 text-2xl leading-none font-base text-black">{props.subheading}</h2>}
        </>
            );
};

export default React.memo(Heading);