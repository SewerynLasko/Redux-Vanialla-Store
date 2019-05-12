// Action Constants -namespace for our actions
export const ADD_TODO = '[Todo] Add Todo';
export const REMOVE_TODO = '[Todo] Remove Todo';

// Action Creators
export class AddToDo {
  readonly type = ADD_TODO; // can not be added/modified after the class has been initiated
  constructor(private payload: any) {}
}

export class RemoveToDo {
  readonly type = REMOVE_TODO; // can not be added/modified after the class has been initiated
  constructor(private payload: any) {}
}
