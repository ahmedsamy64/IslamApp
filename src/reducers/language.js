const INITIAL_STATE = {
    currentLanguage: "",
    words: [],
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_LANGUAGE":
            return {
                ...state,
                currentLanguage: action.data
            }
        case "GET_LANGUAGE_WORDS":
            return {
                ...state,
                words: action.data
            }
        default: return state
    }
}