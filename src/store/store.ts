export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {}) {
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  get value() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reduce(this.state, action);
    // We want to update the this.state object by calling a reduce function
    // which will iterate then through our reducers passing the current state and dispatched action.
    // The reducers will compose a new state which will be rebounded to this.state object.
  }

  private reduce(state, action) {
    const newState = {};
    // Iterate over reducers to bind the newState
    for (const key in this.reducers) {
      newState[key] = this.reducers[key](state[key], action);
      // create a field in newState for all keys in the reducers (i.e. todos)
      // which will equal the result of the reducer function call: newState.todos = this.reducers.todos();
      // Because a particular reducer changes only small part of the state we want to pass to it only this part of the state
    }
    return newState;
  }
}
