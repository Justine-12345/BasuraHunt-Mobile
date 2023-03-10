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
    levelExpReducer,
    userDumpPageReducer
} from './Reducers/userReducers'

import {
    dumpsReducer,
    newDumpReducer,
    allDumpsReducer,
    dumpDetailsReducer,
    dumpReducer,
    rankingReducer,
    dumpCommentReducer,
    dumpPageReducer
} from './Reducers/dumpReducers'

import {
    newChatReducer,
    chatDetailsReducer,
    chatReducer,
    activeChatReducer
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
    newsfeedPageReducer
} from './Reducers/newsfeedReducers';

import { pushNotificationReducer } from './Reducers/pushNotificationReducer';

import { coordinateReducer, mapLoadingReducer } from './Reducers/mapReducers';

import {
    itemsReducer,
    itemReducer,
    itemDetailsReducer,
    newItemReducer,
    itemPageReducer
} from './Reducers/itemReducers';

import {
    newFeedbackReducer,
    feedbackDetailsReducer,
    allFeedBacksReducer
} from './Reducers/feedbackReducers';


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
    userDumpPage: userDumpPageReducer,

    dumps: dumpsReducer,
    newDump: newDumpReducer,
    allDumps: allDumpsReducer,
    dumpDetails: dumpDetailsReducer,
    dump: dumpReducer,
    ranking: rankingReducer,
    dumpComment: dumpCommentReducer,
    dumpPage: dumpPageReducer,

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
    newsfeedPage: newsfeedPageReducer,

    newChat: newChatReducer,
    chatDetails: chatDetailsReducer,
    chat: chatReducer,
    activeChat: activeChatReducer,

    items: itemsReducer,
    item: itemReducer,
    itemDetails: itemDetailsReducer,
    newItem: newItemReducer,
    itemPage: itemPageReducer,

    newFeedback: newFeedbackReducer,
    feedbackDetails: feedbackDetailsReducer,
    allFeedBacks: allFeedBacksReducer,

    coordinate: coordinateReducer,
    mapLoading: mapLoadingReducer,
    pushNotification: pushNotificationReducer
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;