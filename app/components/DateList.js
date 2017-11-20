import React from 'react';

import DateEntry from './DateEntry';

class DateList extends React.Component {
  render() {
    return (
      <div>
        {this.getDates().map((date, index) => {
          return (
            <DateEntry 
              key={index} 
              date={date} 
              items={this.props.items[date.toDateString()]}
              rows={this.props.entryRows}
            />
          );
        })}
      </div>
    );
  }

  getDates() {
    const start = this.props.start;
    const agg = this.props.agg;

    var dates = [];
    for (let i = 0; i < this.props.count; i++) {
      let entry = new Date(start.valueOf());

      if (agg === 'daily') {
         entry.setDate(entry.getDate() + i);
      } else if (agg === 'monthly') {
        entry.setMonth(entry.getMonth() + i);
      }

      dates.push(entry);
    }
    return dates;
  }
}

export default DateList;
