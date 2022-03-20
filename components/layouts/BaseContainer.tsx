/**
 * Container element for the sections. Gives proper margins to both sides to go with the UI Specifications
 *
 */


const BaseContainer: React.FC<{}> = (props) => {
    return <div className="mt-12 px-20 mb-32 flex flex-col container">
        {props.children}
    </div>
}
export default BaseContainer;