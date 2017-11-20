import React from 'react';
import {Row, Column} from 'react-bootstrap';

class ItemList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items === undefined
          ? []
          : this.props.items.map((item) => {
            return this.renderOrEditItem(item)
          }
        )}
      </ul>
    );
  }

  renderOrEditItem(item) {
    return (
      (this.props.editing === item.id
        ? this.editItem(item)
        : this.renderItem(item)
      )
    );
  }

  editItem(item) {
    return (
      <li key={item.id} >
        <form>
          <label>
            item name
            <input 
              name="item"
              type="text"
              onChange={this.props.handleEditField}
            />
          </label>
        </form>
      </li>
    );
  }

  renderItem(item) {
    return (
      <li 
        key={item.id}
        onClick={() => this.props.toggleEditing(item.id)}
      >
        {item.text}
      </li>
    );
  }
}

export default ItemList;
