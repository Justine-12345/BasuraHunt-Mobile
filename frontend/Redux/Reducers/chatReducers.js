import {
    GET_CHAT_REQUEST,
    GET_CHAT_SUCCESS,
    GET_CHAT_FAIL,
    GET_CHAT_RESET,
    APPEND_CHAT,
    NEW_CHAT_REQUEST,
    NEW_CHAT_SUCCESS,
    NEW_CHAT_RESET,
    NEW_CHAT_FAIL,
    UPDATE_CHAT_REQUEST,
    UPDATE_CHAT_SUCCESS,
    UPDATE_CHAT_RESET,
    UPDATE_CHAT_FAIL,
    CLEAR_ERRORS
} from '../Constants/chatConstants'


export const newChatReducer = (state = { chat: {} }, action) => {
    switch (action.type) {

        case NEW_CHAT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_CHAT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                chat: action.payload.chat
            }

        case NEW_CHAT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_CHAT_RESET:
            return {
                ...state,
                success: false,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                loading: false
            }
        default:
            return state
    }
}


export const chatDetailsReducer = (state = { chat: {} }, action) => {
    switch (action.type) {

        case GET_CHAT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_CHAT_SUCCESS:
            let reverseChat = []

            action.payload.chat.chats.slice()
                .reverse()
                .forEach(element => {
                    reverseChat.push(element)
                });

            return {
                loading: false,
                chat: action.payload.chat,
                chats: reverseChat
            }

        case APPEND_CHAT:
            return {
                ...state,
                chats: state.chats.concat(action.payload),
                error: action.payload
            }

        case GET_CHAT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case GET_CHAT_RESET:
            return {
                ...state,
                chat: undefined,
                chats: undefined
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const chatReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_CHAT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_CHAT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case UPDATE_CHAT_FAIL:
            return {
                ...state,
                error: action.payload
            }


        case UPDATE_CHAT_RESET:
            return {
                ...state,
                isUpdated: false,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
