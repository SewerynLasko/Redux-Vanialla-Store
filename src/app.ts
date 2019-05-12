import * as fromStore from './store';
import { renderTodos } from './utils';

const input = document.querySelector('input') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;
const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;

const reducers = {
  todos: fromStore.reducer // This is a toDoReducer. For the property todos we use a function fromStore.reducer
};

const store = new fromStore.Store(reducers);

button.addEventListener(
  'click',
  () => {
    if (!input.value.trim()) {
      return;
    }

    const todo = { label: input.value, complete: false };
    store.dispatch(new fromStore.AddToDo(todo));

    input.value = '';
  },
  false
);

store.subscribe(printStateToConsole);
store.subscribe(renderToDosToScreen);
// Subscribe to store changes (on each change passed function will be called)

function printStateToConsole(state) {
  console.log('STATE:::', state);
}

function renderToDosToScreen(state) {
  renderTodos(state.todos.data);
}

todoList.addEventListener('click', function(event) {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === 'button') {
    console.log(target);
    const todo = JSON.parse(target.getAttribute('data-todo') as any);
    store.dispatch(new fromStore.RemoveToDo(todo));
  }
});

destroy.addEventListener(
  'click',
  function(event) {
    store.unsubscribe(renderToDosToScreen);
  },
  false
);
