import {
    SET_COORDINATE,
    RESET_COORDINATE
} from "../Constants/mapConstants"

export const coordinateReducer = (state = {}, action) => {
    switch (action.type) {

        case SET_COORDINATE:
            return {
                ...state,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude
            }

        case RESET_COORDINATE:
            return {
                ...state,
                latitude: null,
                longtitude: null
            }

        default:
            return state
    }
}