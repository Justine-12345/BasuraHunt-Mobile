import axios from 'axios';

import {
    NEWSFEED_LIST_REQUEST,
    NEWSFEED_LIST_SUCCESS,
    NEWSFEED_LIST_FAIL,

    ALL_NEWSFEEDS_REQUEST,
    ALL_NEWSFEEDS_SUCCESS,
    ALL_NEWSFEEDS_FAIL,

    NEWSFEED_DETAILS_REQUEST,
    NEWSFEED_DETAILS_SUCCESS,
    NEWSFEED_DETAILS_FAIL,

    NEW_NEWSFEED_REQUEST,
    NEW_NEWSFEED_SUCCESS,
    NEW_NEWSFEED_FAIL,

    UPDATE_NEWSFEED_REQUEST,
    UPDATE_NEWSFEED_SUCCESS,
    UPDATE_NEWSFEED_FAIL,

    DELETE_NEWSFEED_REQUEST,
    DELETE_NEWSFEED_SUCCESS,
    DELETE_NEWSFEED_FAIL,

    CLEAR_ERRORS
} from '../Constants/newsfeedConstants';
import baseURL from '../../assets/commons/baseURL'
import AsyncStorage from "@react-native-async-storage/async-storage"

export const getNewsfeedList = (currentPage = 1) => async (dispatch) => {
    try {
        dispatch({
            type: NEWSFEED_LIST_REQUEST
        })
       
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

        const { data } = await axios.get(`${baseURL}/newsfeed?page=${currentPage}`, config)

        dispatch({
            type: NEWSFEED_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEWSFEED_LIST_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getNewsfeedDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: NEWSFEED_DETAILS_REQUEST })
        const { data } = await axios.get(`${baseURL}/newsfeed/${id}`)
        dispatch({
            type: NEWSFEED_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEWSFEED_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getNewsfeeds = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_NEWSFEEDS_REQUEST })

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

        const { data } = await axios.get(`${baseURL}/admin/newsfeeds`, config)

        dispatch({
            type: ALL_NEWSFEEDS_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: ALL_NEWSFEEDS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newNewsfeed = (newsfeedData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_NEWSFEED_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/newsfeed/new`, newsfeedData, config)

        dispatch({
            type: NEW_NEWSFEED_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_NEWSFEED_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateNewsfeed = (id, newsfeedData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_NEWSFEED_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/newsfeed/${id}`, newsfeedData, config)

        dispatch({
            type: UPDATE_NEWSFEED_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_NEWSFEED_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteNewsfeed = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_NEWSFEED_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/newsfeed/${id}`)

        dispatch({
            type: DELETE_NEWSFEED_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_NEWSFEED_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}