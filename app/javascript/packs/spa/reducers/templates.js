export default function templatesReducer(state=[], action) {
  switch (action.type) {
    case "templates/received":
      return action.templates;
    case "template/received":
      return _.uniqBy([action.template, ...state], "id");
    default:
      return state;
  }
}
