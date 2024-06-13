import { View, Text, Pressable, SafeAreaView, ScrollView, Keyboard, Alert, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { TextInput,Button, IconButton,MD3Colors, ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode'
import 'core-js/stable/atob'
import { useDispatch } from 'react-redux';
import { useForgetPasswordOtpMutation, useGenerateEmailOtpMutation, useRemoveAccountMutation, useResetPasswordMutation, useVerifyEmailMutation } from '../../Redux/Api/Auth/userApi';
import { LogoutUser } from '../../Redux/Slice/UserAuth';
// import { LoginUser } from '../../Redux/Slice/UserAuth';
// import { useGetSingleUserMutation, useLoginUserMutation } from '../../Redux/Api/Auth/userApi';


const AccountDeactivate = ({navigation,route}) => {
const {id} = route.params
const dispatch = useDispatch()
const [loading,setLoading] = useState(false)
const [RemoveAccount] = useRemoveAccountMutation()
  const [userData,setUserData] = useState({
    reason:''
  })
//   const dispatch = useDispatch()
  const HandleChange= (name,value)=>{
      setUserData({
        ...userData,[name]:value
      })
  }


 

    const Deactivate = async()=>{
      if(userData.reason){
        const res = await RemoveAccount({id,userData})
          console.log(res)
          if(res.data){
            Alert.alert('You Account has been Successfully Deactivated','We will contact you throught your email ,If there any remaning fund in your wallet it will be delivered to you.')
            AsyncStorage.removeItem('token')
            dispatch(LogoutUser())
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
      label="Reason"
      multiline={true}
      numberOfLines={5}
      placeholder="Why you want to deactivate your account?"
      className="w-[300px]"
      value={userData.reason}
      onChangeText={(text)=>HandleChange("reason",text)}
    />
     

        </View>
       
        <Button onPress={Deactivate} mode="contained" className="bg-[#ff1e05] my-2 rounded font-bold py-1" textColor='white'>
    Deactivate Account
  </Button>
        </View>
       
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default AccountDeactivate