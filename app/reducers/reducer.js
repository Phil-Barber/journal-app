import { combineReducers } from 'redux';

import { 
  FOCUS_DATE,
  TOGGLE_EDIT_ITEM,
  UPDATE_ITEM,
  RECEIVE_ITEMS,
  REQUEST_ITEMS
} from '../actions';

function dateFocus(state = new Date(), action) {
  switch (action.type) {
    case FOCUS_DATE:
      return action.date;
    default: 
      return state;
  }
}

function editItem(state = null, action) {
  switch (action.type) {
    case TOGGLE_EDIT_ITEM:
      return action.itemId;
    default:
      return state;
  }
}

function dateItems(
    state = {
        isFetching : false,
        entriesByDate : {}
    }, 
    action
) {
    switch (action.type) {
        case UPDATE_ITEM:
          return updateItem(state, action.item);
        case REQUEST_ITEMS:
            return Object.assign({}, state, {
                isFetching : true
            });
        case RECEIVE_ITEMS:
            return Object.assign({}, state, {
                isFetching : false,
                entriesByDate : action.entriesByDate,
                lastUpdated : action.receivedAt
            });
        default :
            return state;
    }
}

function updateItem(state, item) {
    const date = item.date.toDateString();
    let itemsForDate = [].concat(state.entriesByDate[date]);
    for (let i = 0; i < itemsForDate.length; i++) {
      if (itemsForDate[i].id === item.id) {
        itemsForDate[i] = item;
        break;
      }
    }
    let newItems = {};
    newItems[date] = itemsForDate;
    return Object.assign({}, state, {
      entriesByDate : Object.assign({}, state.entriesByDate, itemsForDate)
    });
}

const reducer = combineReducers({
  dateFocus,
  editItem,
  dateItems
});

export default reducer;
