
//import { message } from 'antd';
import { login, checkLogin, exitLogin } from '../services/services'
import {
  ToastAndroid,
  AsyncStorage,
} from 'react-native';
import JPushModule from 'jpush-react-native';

function RunPush(data) {
  AsyncStorage.getItem('userInfo').then((result) => {
    if (result != JSON.stringify(data.data)) {
      AsyncStorage.setItem('userInfo', JSON.stringify(data.data))
      JPushModule.setAlias(data.data.userName, () => { }, () => { })
      if( data.data.isDeveloper===1){
        JPushModule.setTags(["developer"], () => {}, () => { });
      }else{
        JPushModule.setTags(["user"], () => {}, () => { });
      }
      
    } else {

    }
  })
  // JPushModule.setAlias(data.data.userName, () => {
  //   // JPushModule.addReceiveCustomMsgListener((message) => {
  //   // //这是默认的通知消息
  //   //   console.warn("addReceiveCustomMsgListener"+message)
  //   // });

  //   // JPushModule.addReceiveNotificationListener((map) => {
  //   //   console.warn(JSON.stringify(map))
  //   // //  var message = JSON.parse(map.extras);
  //   // });

  //   //点击通知进入应用的主页

  //  // JPushModule.addReceiveOpenNotificationListener((map) => {})
  // }, () => {

  // })
}


export default {

  namespace: 'users',

  state: {
    isDeveloper: 0,
    isLogin: false,
    userName: ""
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { data } = yield call(login, payload.userObj);
      if (!data) { return; }
      if (data.status == 1) {
        RunPush(data)
        yield put({
          type: "updateLogin",
          payload: {
            isLogin: true,
            userName: data.data.userName,
            isDeveloper: data.data.isDeveloper,
          }
        });
        payload.navigator.push({ name: 'page2' })

        ToastAndroid.show(data.messages, 1);
      } else {
        ToastAndroid.show(data.messages, 2);
      }
    },
    *checkLogin({ payload }, { call, put }) {
      const { data } = yield call(checkLogin);
      //  console.warn(JSON.stringify(data));
      if (!data) { return; }
      if (data && data.status == 1) {
        yield put({
          type: "updateLogin",
          payload: {
            isLogin: true,
            userName: data.data.userName,
            isDeveloper: data.data.isDeveloper
          }
        });
      } else {
        yield put({
          type: "updateLogin",
          payload: {
            isLogin: false,
            userName: ""
          }
        });
      }
    },
    *exitLogin({ payload }, { call, put }) {
      const { data } = yield call(exitLogin);
      if (!data) { return; }
      if (data && data.status == 1) {
        yield put({
          type: "updateLogin",
          payload: {
            isLogin: false,
            userName: ""
          }
        });
        //   message.success(data.messages);
      }
    },
  },

  reducers: {
    updateLogin(state, action) {
      return { ...state, ...action.payload };
    },
    updateLoginVisible(state, action) {
      return { ...state, ...action.payload };
    },
  },

}
