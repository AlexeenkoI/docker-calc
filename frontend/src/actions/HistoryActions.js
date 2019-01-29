import moment from 'moment';
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

export const getHistory = () => {
  return dispatch => {
    dispatch({
      type : "START_LOADING"
    })

    fetch(`http://${host}:${port}/history/_all_docs?include_docs=true`)
    .then(res => res.json())
    .then(payload => {
      dispatch({
        type : "LOADING_FINISHED",
        payload
      })
    })
    .catch(err => {
      dispatch({
        type : "LOADING_ERROR",
        err : err.message
      })
    })
  }
}

export const saveHistory = (saveItem) => {
  const dateStruct = {
    date : moment(),
    operation : saveItem
  }
  return dispatch => {
    fetch(`http://${host}:${port}/history/`, {
      headers : {
        'Content-Type': 'application/json'
      },
      method : "POST",
      body : JSON.stringify(dateStruct)
    })
    .then(() => {
      dispatch(getHistory())
    })
    .catch(err => {
      dispatch({
        type : "SAVING_ERROR",
        err : err.message
      })
    })
  }
}


