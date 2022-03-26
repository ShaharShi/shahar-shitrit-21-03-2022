const initialState: IThemeState = {
    isDarkMode: !!JSON.parse(localStorage.getItem("darkmode") as string),
}

export const themeReducer = (state: IThemeState = initialState, action: IAction) => {

    switch(action.type) {
        case 'DARK_MODE' : {
            return {
                ...state, isDarkMode: true
            }
        }
        case 'LIGHT_MODE' : {
            return {
                ...state, isDarkMode: false
            }
        }
        default: 
            return state;
    }
}