export function getTemplates() {
  return async (dispatch, _getState, api) => {
    const {data:templates} = await api.get("project_templates");
    dispatch({type: "templates/received", templates});
    return templates;
  }
}

export function addTemplate(details) {
  return async (dispatch, _getState, api) => {
    const {data:template} = await api.post("project_templates", details, {headers: {'Content-Type': 'multipart/form-data'}});
    dispatch({type: "template/received", template});
    return template;
  }
}
