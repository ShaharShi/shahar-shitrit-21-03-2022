export const createActionsGroup = <P>(actionTypes: { start: string, success: string, fail: string }) => ({
    start: () => ({ type: actionTypes.start }),
    success: (payload: P) => ({ type: actionTypes.success, payload }),
    fail: (m: string) => ({ type: actionTypes.fail, payload: m }),
})
