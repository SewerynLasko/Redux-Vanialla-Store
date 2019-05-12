export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  get value() {
    return this.state;
  }

  subscribe(func) {
    this.subscribers = [...this.subscribers, func];
    this.notify();
  }

  unsubscribe(func) {
    this.subscribers = this.subscribers.filter(funcInSubscribers => funcInSubscribers !== func);
  }

  dispatch(action) {
    this.state = this.reduce(this.state, action);
    // We want to update the this.state object by calling a reduce function
    // which will iterate then through our reducers passing the current state and dispatched action.
    // The reducers will compose a new state which will be rebounded to this.state object.
    this.notify();
  }

  private notify() {
    this.subscribers.forEach(func => {
      func(this.value);
    });
    // Earch subscribe is a function. On notify we will loop through all this functions and call then with passed state
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
