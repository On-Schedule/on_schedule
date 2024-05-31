export function getWeekOverview() {
  return async (dispatch, _getState, api) => {
    const {data:weekOverview} = await api.get("analytics/week_overview");
    dispatch({type: 'weekOverview/received', weekOverview});
    return weekOverview;
  }
}