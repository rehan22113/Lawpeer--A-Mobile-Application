import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from '../Screens/Stack/Start';
import SelectRole from '../Screens/Stack/SelectRole';
import Login from '../Screens/Stack/Login';
import Register from '../Screens/Stack/Register';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginUser, LogoutUser } from '../Redux/Slice/UserAuth';
// import { TouchableOpacity } from 'react-native';
import EditProfile from '../Screens/Stack/EditProfile';

import {jwtDecode} from 'jwt-decode'
import { ClientTabNavigation, LawyerTabNavigation } from './TabNavigation';
import Chat from '../Screens/Tabs/Chat/Chat';
import LawyerProfile from '../Screens/Stack/LawyerProfile';
import ChatRoom from '../Screens/Tabs/Chat/ChatRoom';
import { useGetSingleUserMutation } from '../Redux/Api/Auth/userApi';
import ContractDetail from '../Screens/Stack/ContractTabs/ContractDetail';
import Contract from '../Screens/Stack/ContractTabs/Contract';
import Complains from '../Screens/Stack/Complains/Complains';
import AddNewComplain from '../Screens/Stack/Complains/AddNewComplain';
import CreateContract from '../Screens/Stack/ContractTabs/CreateContract';
import NotAvailable from '../Screens/Stack/NotAvailable';
import ForgetPassword from '../Screens/Stack/ForgetPassword';
import Skills from '../Screens/Stack/AddSkills';
import { useNavigation } from '@react-navigation/native';
import VerifyEmail from '../Screens/Stack/VerifyEmail';
import AccountDeactivate from '../Screens/Stack/AccountDeactivate';
import PrivacyPolicy from '../Screens/Stack/PrivacyPolicy';
import Contact from '../Screens/Stack/Contact';
import ChangePassword from '../Screens/Stack/ChangePassword';
import RequestMoney from '../Screens/Stack/RequestMoney';
import Review from '../Screens/Stack/ContractTabs/Review';
// import Chat from '../Screens/Tabs/Chat';

const Stack = createNativeStackNavigator();

// const BackButton = ({onPress})=> <TouchableOpacity style={{alignItems:"center",flexDirection:"row",justifyContent:"center"}}>
// <Ionicons name="chevron-back" size={24} color="black" />
//  <Text onPress={onPress}> Back </Text>
//  </TouchableOpacity>

export const ChatScreen = ()=>{
  return (
    <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name='chatuser' component={ChatRoom} />
    </Stack.Navigator>
  )
} 

export const ContractScreen = ()=>{
  return (
    <Stack.Navigator>
        <Stack.Screen options={{headerShown:false,title:'Contract'}} name='contracts' component={Contract} />
        <Stack.Screen options={{headerShown:false,title:'Contract Detail'}} name='contract_detail' component={ContractDetail} />
    </Stack.Navigator>
  )
}

const StartScreen=()=>{
  return (
    <Stack.Navigator>
       <Stack.Screen options={{headerShown:false}} name='start' component={Start} />
        <Stack.Screen options={{headerShown:false}} name='selectrole' component={SelectRole} />
    </Stack.Navigator>
  )
}

const SignInStackNavigation = () => {
  const Role = useSelector(state=>state.userauth.role)
 


  return (
    <Stack.Navigator>
    
        <Stack.Screen options={{headerShown:false}} name='home' component={Role=="client"?ClientTabNavigation:LawyerTabNavigation} />
        <Stack.Screen options={{headerShown:true,title:'Create Contract'}} name='newcontract' component={Role=="lawyer"? CreateContract:NotAvailable} />

        <Stack.Screen options={{headerShown:false,title: 'Review',
      headerTitleAlign: 'left'}} name='review' component={Review} />

        <Stack.Screen options={{headerShown:true,title: 'Edit Profile',
      headerTitleAlign: 'left'}} name='edit-profile' component={EditProfile} />

<Stack.Screen options={{headerShown:true,title: 'Email Verification',
      headerTitleAlign: 'left'}} name='verify_email' component={VerifyEmail} />

<Stack.Screen options={{headerShown:true,title: 'Account Deactivation',
      headerTitleAlign: 'left'}} name='account_deactivate' component={AccountDeactivate} />

<Stack.Screen options={{headerShown:true,title: 'Change Your Password',
      headerTitleAlign: 'left'}} name='change_password' component={ChangePassword} />

<Stack.Screen options={{headerShown:true,title: 'Add/Update Skill',
      headerTitleAlign: 'left'}} name='skills' component={Skills} />

       <Stack.Screen options={{headerShown:true,title: 'Complains and Reports',
      headerTitleAlign: 'center'}} name='complain' component={Complains} />

<Stack.Screen options={{headerShown:true,title: 'Add New Complain',
      headerTitleAlign: 'center'}} name='new_complain' component={AddNewComplain} />

      <Stack.Screen options={{headerShown:true,title: 'Lawyer Profile',
      headerTitleAlign: 'center'}} name='lawyerprofile' component={LawyerProfile} />

<Stack.Screen options={{headerShown:true,title: 'Request Money',
      headerTitleAlign: 'left'}} name='request_money' component={RequestMoney} />


        <Stack.Screen options={{headerShown:true}} name='chat' component={Chat} />

        <Stack.Screen name='privacy_policy' component={PrivacyPolicy} />
      <Stack.Screen name='contact' component={Contact} />
    </Stack.Navigator>
  )
}

const SignOutStackNavigation = () => {
  const [repeater,setRepeater] = useState("false")
  const checkRepearUser=async()=>{
    const repeat_user = await AsyncStorage.getItem('users')
    // console.log("repeat user",repeat_user)
    setRepeater(repeat_user)
  }

  useEffect(()=>{
    checkRepearUser()
  },[])
  return (
    <Stack.Navigator>
        {/* <Stack.Screen name='chat' component={Chat} /> */}
        {repeater == 'false' && (
        <Stack.Screen options={{headerShown:false}} name='startScreen' component={StartScreen} />
        )}
        
        
        <Stack.Screen options={{headerShown:false}} name='login' component={Login} />
        <Stack.Screen options={{headerShown:false}} name='selectrole' component={SelectRole} />
        <Stack.Screen options={{headerShown:false}} name='register' component={Register} />
        <Stack.Screen options={{headerShown:true,title:"Forget Password"}} name='forget_password' component={ForgetPassword} />
        <Stack.Screen options={{headerShown:true,title: 'Email Verification',
      headerTitleAlign: 'left'}} name='verify_email' component={VerifyEmail} />
        
    </Stack.Navigator>
  )
}


const MainStack = ()=>{

  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state=>state.userauth.isLoggedIn)
  const [userData] = useGetSingleUserMutation()

  const HandleUserLogin=async()=>{
    const data = await AsyncStorage.getItem("token")
    let decoded =""
    // console.log(decoded)
    if(data){
      decoded = await jwtDecode(data)
      await AsyncStorage.setItem("users","true")
      
      const user = await userData(decoded.sub.id)

      console.log("users====",user)

      dispatch(LoginUser({id:decoded.sub.id,role:decoded.sub.role,user:user.data,token:data}))
      
    }
    else{
      dispatch(LogoutUser())
    }
  }
  useEffect(()=>{
    HandleUserLogin()
  },[isLoggedIn])
  return (
    <>
    {isLoggedIn?<SignInStackNavigation/>:<SignOutStackNavigation/>}
    </>
  )
}
export default MainStack