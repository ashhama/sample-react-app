import { ArrowCounterClockwise } from "phosphor-react";

const BottomNavSubmissionNew: React.FC<{
  onSubmit?: (e: any) => void;
}> = (props) => {
  return( 
    <div className="flex justify-between w-full" >
    
    <div className="flex gap-x-4">
      <div className="bg-success w-40 rounded h-5 my-auto shadow-sm"></div>
      <div className="border-white border w-40 rounded h-5 my-auto"></div>
      <div className="border-white border w-40 rounded h-5 my-auto"></div>
    </div>

    <div className="flex gap-x-4">
    <button className="w-16 h-16 rounded-lg font-semibold text-2xl border font-normal border-white text-white">
    <ArrowCounterClockwise className="mx-auto my-auto" size={30} />
      </button>
      <button onClick={props.onSubmit} className="w-44 py-4 rounded-lg font-semibold text-2xl font-normal text-white bg-success">
        Submit
      </button>
    </div>

  </div>);
};

export default BottomNavSubmissionNew;
