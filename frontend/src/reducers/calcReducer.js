const initialState = {
  operandPosition : 1,
  leftOperand : 0,
  operator : '',
  operatorType : '',
  operationType : '',
  rightOperand : '',
  isFloatEnable : false,
  resetAfterChange : false,
  buttons : [
    {type : "control", controlType : "RESET", viewContent : "AC", cssProp : "grey"},
    {type : "control", controlType : "REVERSE", viewContent : "+/-", cssProp : "grey"},
    {type : "control", controlType : "PERCENT", viewContent : "%", cssProp : "grey"},
    {type : "control", controlType : "SPLIT", viewContent : "/", cssProp : "orange"},
    {type : "number", controlType : "CLICK", viewContent : "7", cssProp : "grey"},
    {type : "number", controlType : "CLICK", viewContent : "8", cssProp : "grey"},
    {type : "number", controlType : "CLICK", viewContent : "9", cssProp : "grey"},
    {type : "control", controlType : "MULTIPLE", viewContent : "x", cssProp : "orange"},
    {type : "number", controlType : "CLICK", viewContent : "4", cssProp : "grey"},
    {type : "number", controlType : "CLICK", viewContent : "5", cssProp : "grey"},
    {type : "number", controlType : "CLICK", viewContent : "6", cssProp : "grey"},
    {type : "control", controlType : "MINUS", viewContent : "-", cssProp : "orange"},
    {type : "number", controlType : "CLICK", viewContent : "1", cssProp : "grey"},
    {type : "number", controlType : "CLICK", viewContent : "2", cssProp : "grey"},
    {type : "number", controlType : "CLICK", viewContent : "3", cssProp : "grey"},
    {type : "control", controlType : "PLUS", viewContent : "+", cssProp : "orange"},
    {type : "number", controlType : "CLICK", viewContent : "0", cssProp : "grey", additionalWidth : true},
    {type : "control", controlType : "TO_FLOAT", viewContent : ".", cssProp : "grey"},
    {type : "control", controlType : "RESULT", viewContent : "=", cssProp : "orange"},
  ]
}

export const calcReducer = (state = initialState, action) => {
  switch(action.type){
    case "SET_RESULT" : 
      return {
        ...state,
        leftOperand : action.result.toString(),
        operandPosition : action.operandPos,
        rightOperand : '',
        operatorType : action.operation,
        operator : action.sign,
        resetAfterChange : true
      }
    case "SET_LEFT_OPERAND" : 
      if(state.leftOperand.length > 10) return state;
      let operandToJoin;
      if(state.leftOperand === 0){
        operandToJoin = '';
      }else{
        operandToJoin = state.leftOperand;
      }
      if(state.resetAfterChange){
        return {
          ...state,
          leftOperand : action.operandValue,
          resetAfterChange : false
        }
      }else{
        return {
          ...state,
          leftOperand : [operandToJoin, action.operandValue].join(""),
        }
      }
    case "SET_RIGHT_OPERAND" : 
      if(state.rightOperand.length > 10) return state;
      return {
        ...state,
        rightOperand : [state.rightOperand, action.operandValue].join(""),
      }
    case "CHANGE_OPERAND_POSITION" : 
      const newPosition = state.operandPosition === 1 ? 2 : 1;
      return {
        ...state,
        operandPosition : newPosition,
      }
    case "SET_OPERATOR_TYPE" : 
      return {
        ...state,
        operatorType : action.operatorType,
        operator : action.operatorString
      }
    case "RESET_VALUES" : 
      return {
        ...initialState
      }
    case "REVERSE_VALUE" : 
      if(state.operandPosition === 1) {
        if(state.leftOperand === 0) return state
        if(state.leftOperand[0] === '-'){
          return {
            ...state,
            leftOperand : state.leftOperand.substring(1)
          }
        }
        return {
          ...state,
          leftOperand : `-${state.leftOperand}`
        }
      }else{
        if(state.rightOperand === 0) return state;
        if(state.rightOperand[0] === '-'){
          return {
            ...state,
            rightOperand : state.rightOperand.substring(1)
          }
        }
        return {
          ...state,
          rightOperand : `-${state.rightOperand}`
        }
      }
    case "SET_FLOAT" : 
      if(state.operandPosition === 1) {
        if(state.leftOperand && state.leftOperand.includes('.')) return state
        return {
          ...state,
          leftOperand : state.leftOperand + ".",
          isFloatEnable : true
        }
      }else {
        if(state.rightOperand.includes('.')) return;
        return {
          ...state,
          rightOperand : state.rightOperand + ".",
          isFloatEnable : true
        }
      }
    default : 
      return state
  }
}