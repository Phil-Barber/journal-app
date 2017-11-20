import React from 'react';
import {Row, Col} from 'react-bootstrap';
import ItemList from './ItemList';
import { connect } from 'react-redux';
import { toggleEditing, updateItem } from '../actions';

class DateEntry extends React.Component {
  render() {
    return (
      <div>
        {this.displayDate(this.props.date)}
        <ItemList 
          editing={this.props.editItem}
          items={this.props.items} 
          toggleEditing={this.toggleEditing.bind(this)}
        />
      </div>
    );
  }

  displayDate(date) {
    return (
      <Row>
        <Col md={3} >{this.formatDate(date)}</Col>
        <Col > {this.getDay(date)}</Col>
      </Row>
    );
  }

  formatDate(date) {
    return [
      date.getFullYear(), 
      date.getMonth() + 1, 
      date.getDate()
    ].join('-');
  }

  getDay(date) {
    return [
      "Sunday",
      "Monday", 
      "Tuesday", 
      "Wednesday", 
      "Thursday", 
      "Friday", 
      "Saturday"
    ][date.getDay()];
  }

  toggleEditing(itemId) {
    this.props.dispatch(toggleEditing(itemId));
  }

  handleEditField(event) {
    if (event.keyCode === 13) {
      this.toggleEditing(null);
      this.props.dispatch(updateItem(itemId));
    }
  }

  updateItem() {
  }
}

function mapStateToProps(state) {
  const { editItem } = state;
  return { editItem }
}

export default connect(mapStateToProps)(DateEntry);
