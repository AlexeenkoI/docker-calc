import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextView from './TextView'
import ControlItem from './ControlItem'
//import style from './TextView.styl';
import style from '../../css/calc/Calc.styl'
import { Grid } from '@material-ui/core';
import moment from 'moment'

import { setOperand, changeOperandPosition, setOperator, 
  reverseValue, toFloat, resetValues, executeOperation, findPercent } from '../../actions/CalcActions'


export class Calc extends Component {
  constructor(props){
    super(props);
    this.onOperandClick = this.onOperandClick.bind(this);
    this.onOperationClick = this.onOperationClick.bind(this);
  }

  onOperandClick(operandValue){
  const { operandPosition, setOperand, changeOperandPosition } = this.props;
    setOperand(operandValue, operandPosition);
  }

  onOperationClick(controlType, operatorString){
    const { operandPosition, setOperator, changeOperandPosition, reverseValue, operator, findPercent,
      toFloat, resetValues, leftOperand, rightOperand, isFloatEnable, operatorType, executeOperation } = this.props;

    switch(controlType){
      case "RESET" : 
        resetValues();
        return;
      case "REVERSE" :
        reverseValue(operandPosition);
        return;
      case "TO_FLOAT" : 
        toFloat(operandPosition);
        return;
      case "PERCENT" :
        findPercent(leftOperand,  rightOperand, operator)
        return;
      default : 
        if(operandPosition === 2 && rightOperand){
          executeOperation(operatorType, leftOperand, rightOperand, isFloatEnable)
          return
        }
        setOperator(controlType, operatorString);
        changeOperandPosition();
    }

  }

  render() {
    const { leftOperand, rightOperand, operator, buttons } = this.props;
    return (
      <div className={style.calcRoot}>
        <TextView
          text={[leftOperand,operator,rightOperand].join("")}
        />
        <Grid>
          {buttons.map(btn => 
            <ControlItem
              key={btn.viewContent}
              item={btn}
              handler={btn.type === "control" ? this.onOperationClick : this.onOperandClick}
            />
          )}
        </Grid>
      </div>


    )
  }
}

const mapStateToProps = (state) => ({calcData}) => {
  return {
    leftOperand  : calcData.leftOperand,
    rightOperand : calcData.rightOperand,
    operator : calcData.operator,
    operatorType : calcData.operatorType,
    operandPosition : calcData.operandPosition,
    isFloatEnable  : calcData.isFloatEnable,
    buttons : calcData.buttons
  }
}

const mapDispatchToProps = dispatch => ({
  setOperand : (operandValue, operandPos) => dispatch(setOperand(operandValue, operandPos)),
  changeOperandPosition : () => dispatch(changeOperandPosition()),
  setOperator : (operatorType, operatorString) => dispatch(setOperator(operatorType, operatorString)),
  reverseValue : (operandPos) => dispatch(reverseValue(operandPos)),
  toFloat : (operandPos, value) => dispatch(toFloat(operandPos, value)),
  resetValues : () => dispatch(resetValues()),
  executeOperation : (operation, firstOperand, secondOperand,isFloat) => dispatch(executeOperation(operation, firstOperand, secondOperand,isFloat)),
  findPercent : (firstOperand, secondOperand, operation) => dispatch(findPercent(firstOperand, secondOperand, operation))
})

export default connect(mapStateToProps, mapDispatchToProps)(Calc);

