import { Platform } from 'react-native'

let baseURL = '';

// {
//     Platform.OS == 'android'
//     ? baseURL = 'https://basurahunt-backend.onrender.com/api/v1'
//     : baseURL = 'http://localhost:3000/api/v1/'
// }

// {
//     Platform.OS == 'android'
//     ? baseURL = 'https://hungry-jodhpurs-moth.cyclic.app/api/v1'
//     : baseURL = 'http://localhost:3000/api/v1/'
// }

{
    Platform.OS == 'android'
    ? baseURL = 'http://192.168.0.10:4001/api/v1'
    : baseURL = 'http://localhost:4001/api/v1/'
}

export default baseURL;