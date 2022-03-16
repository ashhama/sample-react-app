import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import FormStoreDataModel from "../models/FormStoreDataModel";
import FormStoreFormModel from "../models/FormStoreFormModel";
import FormStoreModel from "../models/FormStoreModel";

const initialState: FormStoreModel = {
  forms: [],
};

export const formSlice = createSlice({
  name: "form",
  initialState,

  reducers: {
    addToStore: (
      state,
      action: PayloadAction<{
        formId: string;
        values: { id: string; value: any; isValid: boolean };
      }>
    ) => {
     /* const { formId, values } = action.payload;
      
      //state.forms[parseInt(formId)] = new FormStoreFormModel(formId, values);
      //state.forms
      if (state.forms[parseInt(formId)] !== undefined) {

        
const formsCopy = [...state.forms];


      formsCopy[parseInt(formId)].fields.forEach((field,index) => {
          if (field.id === values.id) {
            state.forms[parseInt(formId)].fields[index] = values;
          }
        });
      } else {
        console.log(parseInt(formId));
        state.forms[parseInt(formId)] = {fields: [values]};
      } */
      
    },
    removeDataFromStore: (state) => {
      console.log('remove data from store');
    },
    removeFormStore: (state) => {
      console.log('add data to store');
    },
  },
});

export default formSlice.reducer;
export const formActions = formSlice.actions;
