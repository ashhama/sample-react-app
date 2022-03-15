const BottomNav: React.FC<{}> = (props) => {
    return(
        <>  
            <div className="flex px-12 py-6 w-full fixed bg-site-blue-800 bottom-0 z-40">

            {props.children}

            </div>
        </>
    );
}

export default BottomNav;