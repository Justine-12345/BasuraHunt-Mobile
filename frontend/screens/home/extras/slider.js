import React , {useCallback, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Main from '../../../navigators/main';

export default function Slider() {
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setShowRealApp(true);
  };

  const onSkip = () => {
    setShowRealApp(true);
  };

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
      {showRealApp ? (
      //  <SafeAreaView style={styles.container}>
         // <View style={styles.container}>
         //   <Text style={styles.titleStyle}>
         //     React Native App Intro Slider using AppIntroSlider
        //    </Text>
          //  <Text style={styles.paragraphStyle}>
         //     This will be your screen when you click Skip from any slide or
          //    Done button at last
           // </Text>
            //<Button  title="Show Intro Slider again" onPress={() => setShowRealApp(false)} />
            <Main/>
        //  </View>
      //  </SafeAreaView>
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
        />
      )}
    </>
  );
};

// export default Slider;

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
     paddingHorizontal:20,
     fontStyle: 'italic',
  },
  introTitleStyle: {
    fontSize: 50,
    paddingTop: 0,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal:20
  },
});

const slides = [
  {
    key: 's1',
    text: 'Be a Basurahunter by reporting illegal dumps.',
    title: 'Illegal Dumps Everywhere!',
    image: require('../../../assets/trash.png'),
    
    backgroundColor: '#1e5128',
  },
  {
    key: 's2',
    title: 'Schedule of Waste Collection',
    text: 'Concern-free disposal since wast collection is already planned.',
    image: require('../../../assets/schedule.png'),
    backgroundColor: '#1e5128',
  },
  {
    key: 's3',
    title: 'Donate Reusable Items',
    text: 'Donating resuable items not only helps those in need but also reduces our total watse.',
   image: require('../../../assets/donate.png'),
    backgroundColor: '#1e5128',
  },
  {
    key: 's4',
    title: 'BashuraHunt',
    text: ' BasuraHunt aims to reduce and improve the environmental status, particularly in managing illegal dumps and providing self-awareness to the residents of Taguig City.',
    image: require('../../../assets/icon.png'),
    backgroundColor: '#1e5128',
  },

];
