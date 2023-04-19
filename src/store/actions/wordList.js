export const UPDATE_LIST = "UPDATE_LIST";
export const CLEAR_LIST = "CLEAR_LIST";

export const updateList = (list) => ({ type: UPDATE_LIST, list });
export const clearList = (list) => ({ type: CLEAR_LIST, list });
