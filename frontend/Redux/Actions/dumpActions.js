import axios from 'axios'
import {
    DUMPS_REQUEST,
    DUMPS_SUCCESS,
    DUMPS_FAIL,
    DUMP_LIST_REQUEST,
    DUMP_LIST_SUCCESS,
    DUMP_LIST_FAIL,
    NEW_DUMP_REQUEST,
    NEW_DUMP_SUCCESS,
    NEW_DUMP_FAIL,
    NEW_DUMP_RESET,
    ALL_DUMP_REQUEST,
    ALL_DUMP_SUCCESS,
    ALL_DUMP_FAIL,
    DUMP_DETAILS_REQUEST,
    DUMP_DETAILS_SUCCESS,
    DUMP_DETAILS_FAIL,
    DUMP_DETAILS_RESET,
    UPDATE_DUMP_REQUEST,
    UPDATE_DUMP_SUCCESS,
    UPDATE_DUMP_FAIL,
    UPDATE_DUMP_RESET,
    DELETE_DUMP_REQUEST,
    DELETE_DUMP_SUCCESS,
    DELETE_DUMP_FAIL,
    DELETE_DUMP_RESET,
    DUMP_RANKING_REQUEST,
    DUMP_RANKING_SUCCESS,
    DUMP_RANKING_FAIL,
    DUMP_RANKING_RESET,
    DUMP_COMMENT_REQUEST,
    DUMP_COMMENT_SUCCESS,
    DUMP_COMMENT_FAIL,
    DUMP_COMMENT_RESET,
    DUMP_GET_COMMENT_REQUEST,
    DUMP_GET_COMMENT_SUCCESS,
    DUMP_GET_COMMENT_FAIL,
    DUMP_GET_COMMENT_RESET,
    UPDATE_DUMP_STATUS_REQUEST,
    UPDATE_DUMP_STATUS_SUCCESS,
    UPDATE_DUMP_STATUS_FAIL,
    UPDATE_DUMP_STATUS_RESET,
    DUMP_DELETE_COMMENT_REQUEST,
    DUMP_DELETE_COMMENT_SUCCESS,
    DUMP_DELETE_COMMENT_FAIL,
    DUMP_DELETE_COMMENT_RESET,
    CLEAR_ERRORS
} from '../Constants/dumpConstants'
import baseURL from '../../assets/commons/baseURL'
import AsyncStorage from "@react-native-async-storage/async-storage"


// Add new dump
export const newDump = (dumpData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_DUMP_REQUEST })
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

        const { data } = await axios.post(`${baseURL}/dump/new`, dumpData, config)

        dispatch({
            type: NEW_DUMP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_DUMP_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get Dumps for User
export const getDumps = (keyword = '', currentPage = 1, district = '', barangay = '', waste_size = '', waste_type = '', ismobile = 'false') => async (dispatch) => {
    try {

        dispatch({ type: DUMPS_REQUEST })


        let districtQ = '';
        let barangayQ = '';
        let waste_sizeQ = '';
        let waste_typeQ = '';
        let ismobileQ = '';

        if (district) {
            districtQ = `&district=${district}`
        }

        if (barangay) {
            barangayQ = `&barangay=${barangay}`
        }

        if (waste_size) {
            waste_sizeQ = `&waste_size=${waste_size}`
        }

        if (waste_type) {
            waste_typeQ = `&waste_type.type=${waste_type}`
        }

        if (ismobile) {
            ismobileQ = `&ismobile=${ismobile}`
        }

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

        let link = `${baseURL}/dumps?keyword=${keyword}&page=${currentPage}${waste_typeQ}${districtQ}${barangayQ}${waste_sizeQ}${ismobileQ}`


        const { data } = await axios.get(link, config)


        dispatch({
            type: DUMPS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DUMPS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getDumpList = () => async (dispatch) => {
    try {

        dispatch({ type: DUMP_LIST_REQUEST })

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

        const { data } = await axios.get(`${baseURL}/dump-list`, config)


        dispatch({
            type: DUMP_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: DUMP_LIST_FAIL,
            payload: error.response.data.message
        })
    }
}

// All Dumps for Admin Table
export const allDumps = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_DUMP_REQUEST })

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


        const { data } = await axios.get(`${baseURL}/admin/dumps`, config)

        dispatch({
            type: ALL_DUMP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_DUMP_FAIL,
            payload: error.response.data.message
        })
    }
}


// Dump View
export const getSingleDump = (id) => async (dispatch) => {
    try {

        dispatch({ type: DUMP_DETAILS_REQUEST })

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

        const { data } = await axios.get(`${baseURL}/dump/${id}`, config)
        console.log("data", data)
        dispatch({
            type: DUMP_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DUMP_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}



// Update Dump (ADMIN)
export const updateDump = (id, dumpData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_DUMP_REQUEST })

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

        const { data } = await axios.put(`${baseURL}/admin/dump/${id}`, dumpData, config)

        dispatch({
            type: UPDATE_DUMP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_DUMP_FAIL,
            payload: error.response.data.message
        })
    }
}


// Delete Dumps (Admin)
export const deleteDump = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_DUMP_REQUEST })

        let token
        AsyncStorage.getItem("jwt")
            .then((res) => {
                token = res
            })
            .catch((error) => console.log(error))

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.delete(`${baseURL}/admin/dump/${id}`, config)

        dispatch({
            type: DELETE_DUMP_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_DUMP_FAIL,
            payload: error.response.data.message
        })
    }
}


// Update Dump Status (ADMIN)
export const updateDumpStatus = (id, dumpData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_DUMP_STATUS_REQUEST })

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


        const { data } = await axios.put(`${baseURL}/admin/dump-status/${id}`, dumpData, config)

        dispatch({
            type: UPDATE_DUMP_STATUS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        console.log("error", error)
        dispatch({
            type: UPDATE_DUMP_STATUS_FAIL,
            payload: error.response.data.message
        })
    }
}


// Ranking View
export const rankings = (rankingData) => async (dispatch) => {
    try {

        dispatch({ type: DUMP_RANKING_REQUEST })

        let token
        AsyncStorage.getItem("jwt")
            .then((res) => {
                token = res
            })
            .catch((error) => console.log(error))

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.post(`${baseURL}/rankings/`, rankingData, config)

        dispatch({
            type: DUMP_RANKING_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DUMP_RANKING_FAIL,
            payload: error.response.data.message
        })
    }
}



// Add comment to dump
export const addComment = (id, commentData) => async (dispatch) => {
    try {
        dispatch({ type: DUMP_COMMENT_REQUEST })

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

        const { data } = await axios.put(`${baseURL}/dump/comment/${id}`, commentData, config)

        dispatch({
            type: DUMP_COMMENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DUMP_COMMENT_FAIL,
            payload: error.response.data.message
        })
    }
}


// Add comment to dump
export const getComment = (id) => async (dispatch) => {
    try {

        dispatch({ type: DUMP_GET_COMMENT_REQUEST })


        const { data } = await axios.get(`/api/v1/dump/comment/${id}`)

        dispatch({
            type: DUMP_GET_COMMENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DUMP_GET_COMMENT_FAIL,
            payload: error.response.data.message
        })
    }
}


//  delete comment to dump
export const deleteComment = (id, commentData) => async (dispatch) => {
    try {

        dispatch({ type: DUMP_DELETE_COMMENT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/comment/${id}`, commentData, config)

        dispatch({
            type: DUMP_DELETE_COMMENT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DUMP_DELETE_COMMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}