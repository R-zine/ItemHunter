import { UPDATE_WORD } from "../actions/word";
import { CLEAR_LIST, UPDATE_LIST } from "../actions/wordList";

import { combineReducers } from "redux";

const word = (word = { word: "" }, action) => {
  switch (action.type) {
    case UPDATE_WORD:
      return { word: action.word };
    default:
      return word;
  }
};

const list = (list = { list: [] }, action) => {
  switch (action.type) {
    case UPDATE_LIST:
      return { list: action.list };
    case CLEAR_LIST:
      return { list: [] };
    default:
      return list;
  }
};

export default combineReducers({ word, list });
