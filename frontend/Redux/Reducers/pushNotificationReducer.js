import {
    SET_PUSH_NOTIFICATION,
    RESET_PUSH_NOTIFICATION
} from "../Constants/pushNotificationConstants"

export const pushNotificationReducer = (state = {}, action) => {
    switch (action.type) {

        case SET_PUSH_NOTIFICATION:
            return {
                ...state,
                object: action.payload.object,
                message: action.payload.message,
                screen: action.payload.screen,
            }

        case RESET_PUSH_NOTIFICATION:
            return {
                ...state,
                object: null,
                message: null,
                screen: null,
            }

        default:
            return state
    }
}