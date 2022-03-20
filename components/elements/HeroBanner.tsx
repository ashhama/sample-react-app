/**
 * Hero Banner in home page
 *
 */

const HeroBanner: React.FC<{ imageUrl: string;}> = (
  props
) => {
    
  return (
   <div className="w-full h-[40vh] bg-cover bg-center bg-no-repeat bg-gradient-to-r from-[#007AD2] to-[#003962]">
            <img className="w-full h-full object-cover" src={props.imageUrl} />
        </div>
  )
};

export default HeroBanner;
