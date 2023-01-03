import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Container, NativeBaseProvider, Text } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";

import Header from './layouts/header';
// import Login from './screens/user/login';
// import Personal from './screens/user/register/personal';
import RegisterNav from './navigators/registerNav';
import Main from './navigators/main'
import HomeNav from './navigators/homeNav';
import AccessDenied from './screens/extras/access-denied';
import AuthNav from './navigators/authNav';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import Verification from './screens/user/register/verification';
// import IntroLoading from './screens/extras/IntroLoading2';
import OTP from './screens/user/otp';
import Chat from './screens/chat/chat';

import GarbageCollectorNav from './navigators/garbageCollector/garbageCollectorNav';
import HomeCollectorNav from './navigators/garbageCollector/homeCollectorNav';
import ForgotPassword from './screens/user/forgot-password';
import ResetPassword from './screens/user/reset-password';
import SchedNotifView from './screens/schedule/schedule-notification-view';
import * as Notifications from 'expo-notifications';
import { navigationRef } from './navigators/RootNavigation';
import * as RootNavigation from './navigators/RootNavigation';
import { SET_PUSH_NOTIFICATION } from './Redux/Constants/pushNotificationConstants';
import { getTodayCollectionPointList } from './Redux/Actions/collectionPointActions';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f7faf7"
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [notification, setNotification] = useState(false);
  const [txt, setTxt] = useState("false");
  const [not, setNot] = useState()
  const notificationListener = useRef();
  const responseListener = useRef();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    // console.log("lastNotificationResponse",lastNotificationResponse&&lastNotificationResponse.notification.request.content.data.screen)
    if (lastNotificationResponse) {
      store.dispatch({
        type: SET_PUSH_NOTIFICATION,
        payload: lastNotificationResponse && lastNotificationResponse.notification.request.content.data
      })
    }

  Notifications.addNotificationReceivedListener(notification => {
      const screen = notification.request.content.data.screen;
      if(screen === 'SchedNotifView'){
        store.dispatch(getTodayCollectionPointList())
      }
    });

  }, [lastNotificationResponse]);




  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef} theme={Theme}>
        <NativeBaseProvider>

          <Header />
          <AuthNav />

          {/* <SchedNotifView/> */}


          {/* <ResetPassword/> */}
          {/* <ForgotPassword/> */}
          {/* <RegisterNav /> */}
          {/* <Main/> */}
          {/* <AccessDenied/> */}
          {/* <Verification/> */}
          {/* <IntroLoading/> */}
          {/* <OTP/> */}
          {/* <Chat/> */}

          <Toast/>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
