import * as fromActions from './actions';

// Reducer will provide initial state FOR THE TODOs
// This is a particular reducer for the todos, if I had more data I would have used another reducer
export const initialState = {
  loaded: false,
  loading: false,
  data: [{ label: 'Eat pizza', complete: false }]
};

// In fact, that is toDoReducer
export function reducer(state = initialState, action: { type: string; payload: any }) {
  switch (action.type) {
    case fromActions.ADD_TODO: {
      const todo = action.payload;
      const data = [...state.data, todo];

      return {
        // Return new state with new data
        ...state,
        data: data
      };
    }

    case fromActions.REMOVE_TODO: {
      const data = state.data.filter(todo => todo.label != action.payload.label);
      return {
        ...state,
        data
      };
    }
  }

  return state;
}
