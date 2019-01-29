import React, {Fragment} from 'react'
import Button from '@material-ui/core/Button';

import style from '../../css/calc/ControlItem.styl'



const ControlItem = ({ item, handler,  operandPosition}) => {
  return (
        <Button
          variant="contained" 
          color="primary"
          onClick={() => {
              if(item.type === 'number'){
                return handler(item.viewContent, operandPosition)
              }else if(item.type === 'control'){
                return handler(item.controlType, item.viewContent)
              }
            }
          }
          className={`${style.control} ${style[item.cssProp]} ${item.additionalWidth ? style.controlWide : ''}`}
        >
         {item.viewContent}
        </Button>
  )
}


export default ControlItem
