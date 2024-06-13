import { View, Text, Pressable, SafeAreaView, ScrollView, Keyboard, Alert, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput,Button, IconButton,MD3Colors, ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode'
import 'core-js/stable/atob'
import { useDispatch } from 'react-redux';
import { useForgetPasswordOtpMutation, useGenerateEmailOtpMutation, useResetPasswordMutation, useVerifyEmailMutation } from '../../Redux/Api/Auth/userApi';
// import { LoginUser } from '../../Redux/Slice/UserAuth';
// import { useGetSingleUserMutation, useLoginUserMutation } from '../../Redux/Api/Auth/userApi';


const VerifyEmail = ({navigation,route}) => {
const {email} = route.params
const [VerifyMail] = useVerifyEmailMutation()
const [loading,setLoading] = useState(false)
const [SendMailOtp] = useGenerateEmailOtpMutation()
  const [userData,setUserData] = useState({
    email:"",
    otp:''
  })
  const dispatch = useDispatch()
  const HandleChange= (name,value)=>{
      setUserData({
        ...userData,[name]:value
      })
  }


    const SendMail=async()=>{
      setLoading(true)
    if(userData.email){
      const res = await SendMailOtp({email:userData.email})
      console.log(res)
      setLoading(false);
      Alert.alert('OTP has been sent to your Email and its Valid for only 5 minutes')
    }else{
      Alert.alert('Enter Your Email First ')
    }
    }

    const VerifyEmail = async()=>{
      if(userData.email && userData.otp){
        const res = await VerifyMail(userData)
          console.log(res)
          if(res.data){
            Alert.alert('Email Verified')
            navigation.navigate('profile')
          }

      }else{
        Alert.alert("Some Fields is Missing")
      }
    }

    useEffect(()=>{
      setUserData({...userData,"email":email})
    },[email])

  return (
    <SafeAreaView className="flex-1 pt-0 items-center justify-center h-full w-full bg-white">
      {
        loading && <View className="fixed z-50 flex flex-1 justify-center items-center">
        <ActivityIndicator />
        </View>
      }
<ScrollView keyboardShouldPersistTaps={'always'} className="flex h-auto w-full px-2  ">
    <View className="flex-1 bg-white w-full">
        
        <View className="pt-10 w-full">
        <View className="gap-2 w-full">

        <TextInput
      mode="outlined"
      label="Enter Your Email"
      placeholder="Type something"
      value={userData.email}
      className="w-full"
      right={<TextInput.Icon icon="send" onPress={SendMail} size={24} />}
      onChangeText={(text)=>HandleChange("email",text)}
    />
     <TextInput
       mode="outlined"
       label="Enter OTP"
       placeholder="OTP"
       className="w-full"
      onChangeText={(text)=>HandleChange("otp",text)}
    />

        </View>
       
        <Button onPress={VerifyEmail} mode="contained" className="bg-[#FFE505] my-2 rounded font-bold py-1" textColor='black'>
    Verify
  </Button>
        </View>
       
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default VerifyEmail