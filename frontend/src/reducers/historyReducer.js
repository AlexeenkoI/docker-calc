const initialState = {
  history : [],
  loading : false,
  errorMessage : ''
}

export const historyReducer = (state = initialState, action) => {
  switch(action.type){
    case "START_LOADING" : 
      return {
        ...state,
        loading : true
      }
    case "LOADING_FINISHED" : 
      return {
        ...state,
        loading : false,
        history : action.payload.rows
      }
    case "LOADING_ERROR" : 
      return {
        loading : false,
        errorMessage : action.err
      }
    case "SAVING_ERROR" : 
      return {
        errorMessage : action.err
      }
    default:
      return state;
  }
}