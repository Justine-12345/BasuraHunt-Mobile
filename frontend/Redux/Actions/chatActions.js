import axios from 'axios'
import {
    GET_CHAT_REQUEST,
    GET_CHAT_SUCCESS,
    GET_CHAT_FAIL,
    GET_CHAT_RESET,
    NEW_CHAT_REQUEST,
    NEW_CHAT_SUCCESS,
    NEW_CHAT_RESET,
    NEW_CHAT_FAIL,
    UPDATE_CHAT_REQUEST,
    UPDATE_CHAT_SUCCESS,
    UPDATE_CHAT_RESET,
    UPDATE_CHAT_FAIL,
    ACTIVE_CHAT_REQUEST,
    ACTIVE_CHAT_SUCCESS,
    ACTIVE_CHAT_RESET,
    ACTIVE_CHAT_FAIL,
    CLEAR_ERRORS
} from '../Constants/chatConstants'

import baseURL from '../../assets/commons/baseURL'
import AsyncStorage from "@react-native-async-storage/async-storage"



// New chat
export const newChat = (chatData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_CHAT_REQUEST })

        const { data } = await axios.post(`${baseURL}/api/v1/chat/new`, chatData, config)

        dispatch({
            type: NEW_CHAT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_CHAT_FAIL,
            payload: error.response.data.message
        })
    }
}



// Get Chat
export const getChat = (id) => async (dispatch) => {
    try {
       
        dispatch({ type: GET_CHAT_REQUEST })

        let token
        AsyncStorage.getItem("jwt")
            .then((res) => {
                token = res
            })
            .catch((error) => console.log(error))

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.get(`${baseURL}/chat/${id}`, config)

        dispatch({
            type: GET_CHAT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_CHAT_FAIL,
            payload: error.response.data.message
        })
    }
}


// Update chat
export const updateChat = (id, chatData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_CHAT_REQUEST })

        let token
        AsyncStorage.getItem("jwt")
            .then((res) => {
                token = res
            })
            .catch((error) => console.log(error))

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.put(`${baseURL}/chat/${id}`, chatData, config)

        dispatch({
            type: UPDATE_CHAT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_CHAT_FAIL,
            payload: error.response.data.message
        })
    }
}


// active chat
export const activeChat = (activeData) => async (dispatch) => {
    try {

        dispatch({ type: ACTIVE_CHAT_REQUEST })

        let token
        AsyncStorage.getItem("jwt")
            .then((res) => {
                token = res
            })
            .catch((error) => console.log(error))

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.post(`${baseURL}/chat/active-chat`, activeData, config)

        dispatch({
            type: ACTIVE_CHAT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: ACTIVE_CHAT_FAIL,
            payload: error.response.data.message
        })
    }
}
