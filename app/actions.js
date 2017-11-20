export const FOCUS_DATE = "FOCUS_DATE";
export const TOGGLE_EDIT_ITEM = "TOGGLE_EDIT_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const RECEIVE_ITEMS = "RECEIVE_ITEMS";
export const REQUEST_ITEMS = "REQUEST_ITEMS";

export function focusDate(date) {
  return {
    type : FOCUS_DATE,
    date
  }
}

export function toggleEditing(itemId) {
  return {
    type : TOGGLE_EDIT_ITEM,
    itemId 
  }
}

export function requestItems(date) {
  return {
    type: REQUEST_ITEMS,
    date 
  }
}

export function updateItem(item) { 
  return {
    type: UPDATE_ITEM,
    item
  }
}

export function receiveItems(date, items) {
  let entriesByDate = getEntriesByDate(items);
  return {
    type: RECEIVE_ITEMS,
    entriesByDate,
    receivedAt: Date.now()
  }
}

function getEntriesByDate(items) {
  let entriesByDate = {}
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let date = new Date(Date.parse(item.date));
    let key = date.toDateString();
    entriesByDate[key] = (entriesByDate[key] === undefined
      ? [item]
      : entriesByDate[key].concat([item])
    );
  }
  return entriesByDate;
}

function fetchItems(date) {
  return dispatch => {
    dispatch(requestItems(date))
    return fetch('http://localhost:3000/items?date='+date.toString())
      .then(response => response.json())
      .then(json => dispatch(receiveItems(date, JSON.parse(json).items)))
  }
}

function shouldFetchItems(state, date) {
  const items = state.dateItems.entriesByDate;
  const dates = Object.keys(items);

console.log(items);
console.log(dates);
  if (!dates || dates[date.toDateString()] === undefined) {
    return true
  } 
  return false
}

export function fetchItemsIfNeeded(dates) {
  return (dispatch, getState) => {
    dates.forEach( date => {
      if (shouldFetchItems(getState(), date)) {
        return dispatch(fetchItems(date));
      }
    })
  }
}
