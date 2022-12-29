import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import {
    registerDataReducer,
    authReducer,
    allUsersReducer,
    findEmailReducer,
    userReducer,
    forgotPasswordReducer,
    userDetailsReducer,
    userReportsAndItemsReducer,
    notificationReducer,
    levelExpReducer
} from './Reducers/userReducers'

import {
    dumpsReducer,
    newDumpReducer,
    allDumpsReducer,
    dumpDetailsReducer,
    dumpReducer,
    rankingReducer,
    dumpCommentReducer
} from './Reducers/dumpReducers'

import {
    newChatReducer,
    chatDetailsReducer,
    chatReducer
} from './Reducers/chatReducers';

import {
    collectionPointsReducer,
    collectionPointsTodayReducer,
    collectionPointsUpcomingReducer,
    collectorsReducer,
    collectionPointReducer,
    collectionPointDetailsReducer,
    newCollectionPointReducer,
    liveNotificationReducer,
} from './Reducers/collectionPointReducers';

import {
    itemsReducer,
    itemReducer,
    itemDetailsReducer,
    newItemReducer,
} from './Reducers/itemReducers';

import {
    newsfeedsReducer,
    newsfeedReducer,
    newsfeedDetailsReducer,
    newNewsfeedReducer,
} from './Reducers/newsfeedReducers';

import { coordinateReducer } from './Reducers/mapReducers';

const reducers = combineReducers({
    registerData: registerDataReducer,
    auth: authReducer,
    allUsers: allUsersReducer,
    findEmail: findEmailReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    userReportsAndItems: userReportsAndItemsReducer,
    notification: notificationReducer,
    levelExp: levelExpReducer,

    dumps: dumpsReducer,
    newDump: newDumpReducer,
    allDumps: allDumpsReducer,
    dumpDetails: dumpDetailsReducer,
    dump: dumpReducer,
    ranking: rankingReducer,
    dumpComment: dumpCommentReducer,

    newChat: newChatReducer,
    chatDetails: chatDetailsReducer,
    chat: chatReducer,

    collectionPoints: collectionPointsReducer,
    collectionPointsToday: collectionPointsTodayReducer,
    collectionPointsUpcoming: collectionPointsUpcomingReducer,
    collectors: collectorsReducer,
    collectionPoint: collectionPointReducer,
    collectionPointDetails: collectionPointDetailsReducer,
    newCollectionPoint: newCollectionPointReducer,
    liveNotification: liveNotificationReducer,

    items: itemsReducer,
    item: itemReducer,
    itemDetails: itemDetailsReducer,
    newItem: newItemReducer,

    newsfeeds: newsfeedsReducer,
    newsfeed: newsfeedReducer,
    newsfeedDetails: newsfeedDetailsReducer,
    newNewsfeed: newNewsfeedReducer,

    coordinate: coordinateReducer
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;