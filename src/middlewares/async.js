export default ({ dispatch }) => next => action => {
  // Check to see if the action has a promise on it's payload property
  // if it does, wait for it to resolve
  // if it doesn't, send the action to the next middleware
  if (!action.payload || !action.payload.then) {
    return next(action);
  }

  // Wait for promise to resolve, then create new action with data and dispatch
  action.payload.then(function(response) {
    const newAction = { ...action, payload: response };
    dispatch(newAction);
  });
};
