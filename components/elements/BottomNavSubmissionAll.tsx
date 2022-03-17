const BottomNavSubmissionAll: React.FC<{resultCount:number; addNewSubmissionHandler:(e:any)=>void}> = (props) => {
  return( 
  <div className="flex justify-between w-full" >
    <div className="flex">
      <h2 className="my-auto font-medium text-white text-2xl">Showing all {props.resultCount} results</h2>
    </div>
    <div className="flex">
      <button onClick={props.addNewSubmissionHandler} className="px-12 py-4 rounded font-semibold text-2xl border font-normal border-white text-white">
        Add New Submission
      </button>
    </div>

  </div>);
};

export default BottomNavSubmissionAll;
