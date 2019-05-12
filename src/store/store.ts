export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {}) {
    this.state = initialState;
  }

  get value() {
    return this.state;
  }

  dispatch(action) {
    this.state = {
      ...this.state, // merge in this.state to brand new state object that we just created
      todos: [...this.state.todos, action.payload] // overwrite it with our changes
    };
    console.log(this.state);
  }
}
