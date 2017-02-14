
//import { message } from 'antd';
import {login,checkLogin,exitLogin} from '../services/services'
import {
  ToastAndroid
} from 'react-native';


export default {

  namespace: 'users',

  state: {
    isDeveloper:0,
    isLogin:false,
    userName:""
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
         const { data } = yield call(login,payload.userObj);
         if(!data){return;}
         if(data.status==1){
           yield put({
               type:"updateLogin",
               payload:{
                    isLogin:true,
                    userName:data.data.userName,
                    isDeveloper:data.data.isDeveloper,
               }
           });
            payload.navigator.push({name:'page2'})
            ToastAndroid.show(data.messages,1);
         }else{
            ToastAndroid.show(data.messages,2);
         }
    },
    *checkLogin({ payload }, { call, put }) {
        const { data } = yield call(checkLogin);
       //  console.warn(JSON.stringify(data));
          if(!data){return;}
        if(data&&data.status==1){
           yield put({
               type:"updateLogin",
               payload:{
                    isLogin:true,
                    userName:data.data.userName,
                    isDeveloper:data.data.isDeveloper
               }
           });
         }else{
            yield put({
               type:"updateLogin",
               payload:{
                    isLogin:false,
                    userName:""
               }
           });
         }
    },
    *exitLogin({ payload }, { call, put }) {
        const { data } = yield call(exitLogin);
          if(!data){return;}
        if(data&&data.status==1){
           yield put({
               type:"updateLogin",
               payload:{
                    isLogin:false,
                    userName:""
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
