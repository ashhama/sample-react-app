const BottomNavSubmissionSingle = () => {
  return( 
  <div className="flex justify-end w-full" >
    
    <div className="flex gap-x-4">
    <button className="w-44 py-4 rounded-lg font-semibold text-2xl border font-normal border-white text-white">
        Cancel
      </button>
      <button className="w-44 py-4 rounded-lg font-semibold text-2xl font-normal text-white bg-success">
        Save
      </button>
    </div>

  </div>);
};

export default BottomNavSubmissionSingle;
