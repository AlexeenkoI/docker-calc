import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress';

import style from '../../css/history/History.styl'

import { getHistory } from '../../actions/HistoryActions'

export class History extends Component {

  componentDidMount(){
    this.props.loadHistory();
  }

  render() {
    const { loading , history, errorMessage } = this.props;

    if(loading) return <div className={style.preloader}><CircularProgress /></div>
    if(errorMessage) return <div>{errorMessage}</div>
    return (
      <Fragment>
        <h2>История операций</h2>
        <div>
          { history.map(item => <div key={item.id}>{moment(item.doc.date).format("DD-MM-YYYY HH:mm")} {item.doc.operation}</div>) }
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({ history }) => {
  return {
    loading : history.loading,
    history : history.history,
    errorMessage : history.errorMessage
  }
}

const mapDispatchToProps = dispatch => ({
  loadHistory : () => dispatch(getHistory()),
})

//export default History

export default connect(mapStateToProps, mapDispatchToProps)(History)
