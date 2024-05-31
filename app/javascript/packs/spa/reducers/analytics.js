export default function analyticsReducer(state={}, action) {
  switch (action.type) {
    case 'weekOverview/received':
      return {...state, weekOverview: action.weekOverview};
    default:
      return state;
    }
}