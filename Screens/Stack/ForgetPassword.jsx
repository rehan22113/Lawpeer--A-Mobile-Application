import { View, Text, Pressable, SafeAreaView, ScrollView, Keyboard, Alert, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { TextInput,Button, IconButton,MD3Colors, ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode'
import 'core-js/stable/atob'
import { useDispatch } from 'react-redux';
import { useForgetPasswordOtpMutation, useResetPasswordMutation } from '../../Redux/Api/Auth/userApi';
// import { LoginUser } from '../../Redux/Slice/UserAuth';
// import { useGetSingleUserMutation, useLoginUserMutation } from '../../Redux/Api/Auth/userApi';


const ForgetPassword = ({navigation}) => {
//   const [loginUser] = useLoginUserMutation()
//   const [userinfo] = useGetSingleUserMutation()
const [showPassword,setShowPassword] = useState(true)
const [ResetPass] = useResetPasswordMutation()
const [loading,setLoading] = useState(false)
const [SendForgetPasswordMail] = useForgetPasswordOtpMutation()
  const [userData,setUserData] = useState({
    email:"",
    otp:'',
    new_password:""
  })
  const dispatch = useDispatch()
  const HandleChange= (name,value)=>{
      setUserData({
        ...userData,[name]:value
      })
  }
//   const HandleLogin=async()=>{
//     try {
//       Keyboard.dismiss();
//       const res =await loginUser(userData)
      
//       let token =  await res

//       if(res.error == undefined){
//         let decoded = await jwtDecode(token.data.access_token)
//         // console.log(decoded.sub.id)
//         await AsyncStorage.setItem('token', token.data.access_token);
//       const user = await userinfo(decoded.sub.id)
        
//         dispatch(LoginUser({id:decoded.sub.id,role:decoded.sub.role,user:user.data,token:token.data.access_token}))
//         navigation.navigate("home")
//       }
//     } catch (e) {
//       // saving error
//       console.log(e,"data async storage error")
//     }
//   }

    const SendMail=async()=>{
      setLoading(true)
    if(userData.email){
      const res = await SendForgetPasswordMail({email:userData.email})
      console.log(res)
      setLoading(false);
      Alert.alert('OTP has been sent and Valid for only 5 minutes')
    }else{
      Alert.alert('Enter Your Email First ')
    }
    }

    const ResetPassword = async()=>{
      if(userData.email && userData.otp && userData.new_password){
        const res = await ResetPass(userData)
          console.log(res)
          if(res.data){
            Alert.alert('Password Updated Successfully')
            navigation.navigate('login')
          }

      }else{
        Alert.alert("Some Fields is Missing")
      }
    }

  return (
    <SafeAreaView className="flex-1 pt-0 items-center justify-center h-full w-full bg-white">
      {
        loading && <View className="fixed z-50 flex flex-1 justify-center items-center">
        <ActivityIndicator />
        </View>
      }
<ScrollView keyboardShouldPersistTaps={'always'} className="flex h-auto  ">
    <View className="flex-1 bg-white">
        
        <View className="pt-10">
        <View className="gap-2">

        <TextInput
      mode="outlined"
      label="Enter Your Email"
      placeholder="Type something"
      className="w-[300px]"
      right={<TextInput.Icon icon="send" onPress={SendMail} size={24} />}
      onChangeText={(text)=>HandleChange("email",text)}
    />
     <TextInput
       mode="outlined"
       label="Enter OTP"
       placeholder="OTP"
      onChangeText={(text)=>HandleChange("otp",text)}
    />

<TextInput
       mode="outlined"
       label="Enter New Password"
       placeholder="New Password"
      secureTextEntry={showPassword}
      right={<TextInput.Icon onPress={()=>setShowPassword(!showPassword)} icon={showPassword?"eye":'eye-off'} />}
      onChangeText={(text)=>HandleChange("new_password",text)}
    />
        </View>
       
        <Button onPress={ResetPassword} mode="contained" className="bg-[#FFE505] my-2 rounded font-bold py-1" textColor='black'>
    Reset Password
  </Button>
        </View>
       
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default ForgetPassword