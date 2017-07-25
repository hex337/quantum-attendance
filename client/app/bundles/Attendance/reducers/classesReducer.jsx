import Immutable from 'immutable';

import * as actionTypes from '../constants/classesConstants';

export const $$initialState = Immutable.fromJS({
  $$classes: [],
  fetchClassError: null,
  submitClassError: null,
  isFetching: false,
  isSaving: false
});

export default function classesReducer($$state = $$initialState, action = null) {
  const { type, cls, classes, error } = action;

  switch(type) {
    case actionTypes.FETCH_CLASSES_SUCCESS: {
      return $$state.merge({
        $$classes: classes,
        fetchClassError: null,
        isFetching: false
      });
    }

    case actionTypes.FETCH_CLASSES_FAILURE: {
      return $$state.merge({
        fetchClassError: error,
        isFetching: false
      });
    }

    case actionTypes.MESSAGE_RECEIVED: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$classes'],
            $$classes => ($$classes.findIndex(clss => clss.get('id') === comment.get('id')) === -1 ? $$comments.unshift(Immutable.fromJS(cls)) : $$classes),
          )
      ));
    }

    case actionTypes.SUBMIT_CLASS_SUCCESS: {
      return $$state.withMutations(state => (
        state.updateIn(
          ['$$classes'],
          $$classes => $$classes.unshift(Immutable.fromJS(cls)),
        ).merge({
          submitClassError: null,
          isSaving: false,
        })
      ));
    }

    case actionTypes.SUBMIT_CLASS_FAILURE: {
      return $$state.merge({
        submitClassError: error,
        isSaving: false
      });
    }

    case actionTypes.SET_IS_FETCHING: {
      return $$state.merge({
        isFetching: true,
      });
    }

    case actionTypes.SET_IS_SAVING: {
      return $$state.merge({
        isSaving: true,
      });
    }

    default: {
      return $$state;
    }
  }
};
