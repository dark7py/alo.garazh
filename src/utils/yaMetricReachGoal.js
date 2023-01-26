export const yaMetricReachGoal = (goal, options) => {
  if (window.ym) {
    window.ym(window.ENV.REACT_APP_YA_METRICS_ID,
      'reachGoal', goal, options);
  }
};
