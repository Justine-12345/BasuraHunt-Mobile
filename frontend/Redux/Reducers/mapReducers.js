import {
    SET_COORDINATE,
    RESET_COORDINATE,
    SET_MAP_INITIALIZING,
    RESET_MAP_INITIALIZING,
    SET_ADDRESS,
    RESET_ADDRESS
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


export const mapLoadingReducer = (state = {}, action) => {
    switch (action.type) {

        case SET_MAP_INITIALIZING:
            return {
                ...state,
                initializing: action.payload.initializing,
            }

        case RESET_MAP_INITIALIZING:
            return {
                ...state,
                initializing: null,
            }

        default:
            return state
    }
}

export const addressReducer = (state = {}, action) => {
    switch (action.type) {

        case SET_ADDRESS:
            return {
                ...state,
                address: action.payload,
            }

        case RESET_ADDRESS:
            return {
                ...state,
                address: undefined,
            }

        default:
            return state
    }
}