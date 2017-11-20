import React, { Component } from 'react';
import { connect } from 'react-redux';

import WeeklyView from '../components/WeeklyView';
import { fetchItemsIfNeeded } from '../actions';

class App extends React.Component {
  componentDidMount() {
    const { dispatch, dateFocus } = this.props;
    let dates = [];
    for (let i = 0; i < 7; i++) {
        let newDate = new Date();
        newDate.setDate(this.props.dateFocus.getDate() + i);
        dates.push(newDate);
    }
    dispatch(fetchItemsIfNeeded(dates));
  }

  render() {
    return (
      <div>
        <div id='header'></div>
        <div className='container'>
          <WeeklyView 
            date={this.props.dateFocus} 
            items={this.props.entriesByDate}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { dateFocus, dateItems } = state;
  const {
      isFetching,
      lastUpdated,
      entriesByDate
  } = dateItems || {
      isFetching : true,
      entriesByDate: {}
  }

  return { 
    dateFocus,
    entriesByDate
  };
}

export default connect(mapStateToProps)(App)
