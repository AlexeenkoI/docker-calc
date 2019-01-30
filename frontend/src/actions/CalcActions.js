import { saveHistory } from './HistoryActions'

export const setOperand = (operandValue, operandPos) => {
  if(operandPos === 1){
    return {
      type : "SET_LEFT_OPERAND",
      operandValue,
    }
  }else{
    return {
      type : "SET_RIGHT_OPERAND",
      operandValue,
    }
  }
}

export  const changeOperandPosition = () => {
  return {
    type : "CHANGE_OPERAND_POSITION"
  }
}

export const setOperator = (operatorType, operatorString) => {
  return {
    type : "SET_OPERATOR_TYPE",
    operatorType,
    operatorString
  }
}

export const reverseValue = (operandPos) => {
  return {
    type : "REVERSE_VALUE",
    operandPos,
  }
}

export const resetValues = () => {
  return {
    type : "RESET_VALUES"
  }
}

export const toFloat = (operandPos, value) => {
  return {
    type : "SET_FLOAT",
  }
}

export const findPercent = (firstOperand, secondOperand, operation) => {
  return dispatch => {
    secondOperand = secondOperand ? secondOperand : 1;
    const result = parseFloat(firstOperand) / 100 * parseFloat(secondOperand);
    const resultItem = `${firstOperand} ${operation} ${secondOperand} % ${result}`;
    dispatch(saveHistory(resultItem))
    dispatch({
      type : "SET_RESULT",
      result,
      resetAfterChange : true
    })
  }
}


export const executeOperation = (operation, firstOperand, secondOperand, isFloat, controlType) => {

  return dispatch => {
    let result = "";
    let sign = '';
    let operandPos = 1;

    if(isFloat){
      firstOperand = parseFloat(firstOperand);
      secondOperand = parseFloat(secondOperand);
    }else{
      firstOperand =  parseInt(firstOperand);
      secondOperand =  parseInt(secondOperand);
    }
    try {
      switch(operation){
        case "SPLIT" : 
          result = firstOperand/secondOperand;
          sign = "/";
          operandPos = 2;
          break;
        case "MULTIPLE" : 
          result = firstOperand * secondOperand;
          sign = "X";
          operandPos = 2;
          break;
        case "MINUS" : 
          result = firstOperand - secondOperand;
          sign = "-";
          operandPos = 2;
          break;
        case "PLUS" : 
          result  = firstOperand + secondOperand;
          sign = "+";
          operandPos = 2;
          break;
        case "RESULT" :
          sign = '';
          operation = '';
          break;
        default : 
          result = firstOperand;
          sign = '';

      }
      if(secondOperand){
        const resultItem = `${firstOperand} ${sign} ${secondOperand} = ${result}`;
        dispatch(saveHistory(resultItem))
      }
      switch(controlType){
        case "RESULT" : 
          sign = '';
          operation = '';
          operandPos = 1;
          break;
        case "PLUS":
          sign = "+";
          operation = "PLUS";
          operandPos = 2;
          break;
        case "MINUS":
          sign = "-";
          operation = "MINUS";
          operandPos = 2;
          break;
        case "MULTIPLE":
          sign = "X";
          operation = "MULTIPLE";
          operandPos = 2;
          break;
        case "SPLIT" :
          sign = "/";
          operation = "SPLIT";
          operandPos = 2;
          break;
      }
    } catch (error) {
      result = error.message
    }

    dispatch({
      type : "SET_RESULT",
      result,
      resetAfterChange : true,
      sign,
      operation,
      operandPos
    })

  }
}