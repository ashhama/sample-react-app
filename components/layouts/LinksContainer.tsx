const LinksContainer: React.FC<{}> = (props) => {
    return <div className="py-12 px-8 bg-site-gray-100 border border-site-gray-300 rounded-lg">
        {props.children}
    </div>
}
export default LinksContainer;