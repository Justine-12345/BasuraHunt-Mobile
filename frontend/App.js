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
import { getItemDetails } from './Redux/Actions/itemActions';
import Icon from 'react-native-vector-icons/Ionicons';
import About from './screens/home/extras/about';
import { loadUser } from './Redux/Actions/userActions';
import {
  StyleSheet,
  View,
  Image,
  Button,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { getLevelExp } from './Redux/Actions/userActions';
// import Slider from './screens/home/extras/slider';
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
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setShowRealApp(true);
  };

  const onSkip = () => {
    setShowRealApp(true);
  };


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
     const obj_id = notification.request.content.data.object
      if (screen === 'SchedNotifView') {
        store.dispatch(getTodayCollectionPointList())
      }
      else if (screen === 'MyPublicReportsView') {
        store.dispatch(getLevelExp())
      } else if (screen === 'MyPublicDonationsView') {
        store.dispatch(getItemDetails(obj_id))
        store.dispatch(getLevelExp())
      }
      else if (screen === 'MyPublicClaimedDonationsView') {
        store.dispatch(getLevelExp())
      }
      else if (screen === 'MyPublicReceivedDonationsView') {
        store.dispatch(getLevelExp())
      }

      store.dispatch(loadUser())

    });



  }, [lastNotificationResponse]);


  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTitleStyle}>{item.title}</Text>

        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    );
  };



  return (
    <>
      {showRealApp ?
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

              <Toast />
            </NativeBaseProvider>
          </NavigationContainer>
        </Provider> :
        <Provider store={store}>
          <NavigationContainer ref={navigationRef} theme={Theme}>
            <NativeBaseProvider>
              <AppIntroSlider
                data={slides}
                renderItem={RenderItem}
                onDone={onDone}
                showSkipButton={true}
                onSkip={onSkip}
              />
            </NativeBaseProvider>
          </NavigationContainer>
        </Provider>
      }
    </>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    resizeMode: 'contain',
    paddingTop: 300,
    width: 300,
    height: 150
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingBottom: 20,
    paddingHorizontal: 20,
    fontStyle: 'italic',
  },
  introTitleStyle: {
    fontSize: 50,
    paddingTop: 0,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    lineHeight: 50
  },
});

const slides = [
  {
    key: 's1',
    text: 'Be a Basurahunter by reporting illegal dumps.',
    title: 'Illegal Dumps Everywhere!',
    image: require('./assets/trash.png'),

    backgroundColor: '#1e5128',
  },
  {
    key: 's2',
    title: 'Schedule of Waste Collection',
    text: 'Concern-free disposal since wast collection is already planned.',
    image: require('./assets/schedule.png'),
    backgroundColor: '#1e5128',
  },
  {
    key: 's3',
    title: 'Donate Reusable Items',
    text: 'Donating resuable items not only helps those in need but also reduces our total watse.',
    image: require('./assets/donate.png'),
    backgroundColor: '#1e5128',
  },
  {
    key: 's4',
    title: 'BasuraHunt',
    text: ' BasuraHunt aims to reduce and improve the environmental status, particularly in managing illegal dumps and providing self-awareness to the residents of Taguig City.',
    image: require('./assets/icon.png'),
    backgroundColor: '#1e5128',
  },

];
