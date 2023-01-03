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
    collectionPointsUpcomingReducer,
    collectionPointsTodayReducer,
    collectionPointsReducer,
    collectorsReducer,
    collectionPointReducer,
    collectionPointDetailsReducer,
    newCollectionPointReducer,
    liveNotificationReducer,
} from './Reducers/collectionPointReducers';

import {
    newsfeedsReducer,
    newsfeedReducer,
    newsfeedDetailsReducer,
    newNewsfeedReducer,
} from './Reducers/newsfeedReducers';

import { pushNotificationReducer } from './Reducers/pushNotificationReducer';

import { coordinateReducer } from './Reducers/mapReducers';

import {
    itemsReducer,
    itemReducer,
    itemDetailsReducer,
    newItemReducer,
} from './Reducers/itemReducers';


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

    collectionPointsUpcoming: collectionPointsUpcomingReducer,
    collectionPointsToday: collectionPointsTodayReducer,
    collectionPoints: collectionPointsReducer,
    collectors: collectorsReducer,
    collectionPoint: collectionPointReducer,
    collectionPointDetails: collectionPointDetailsReducer,
    newCollectionPoint: newCollectionPointReducer,
    liveNotification: liveNotificationReducer,

    newsfeeds: newsfeedsReducer,
    newsfeed: newsfeedReducer,
    newsfeedDetails: newsfeedDetailsReducer,
    newNewsfeed: newNewsfeedReducer,

    newChat: newChatReducer,
    chatDetails: chatDetailsReducer,
    chat: chatReducer,

    items: itemsReducer,
    item: itemReducer,
    itemDetails: itemDetailsReducer,
    newItem: newItemReducer,

    coordinate: coordinateReducer,
    pushNotification: pushNotificationReducer
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;