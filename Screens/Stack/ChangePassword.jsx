import { View, Text, Pressable, SafeAreaView, ScrollView, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput,Button, IconButton,MD3Colors, ActivityIndicator } from 'react-native-paper';

import 'core-js/stable/atob'
import { useDispatch } from 'react-redux';
import { useChangePasswordMutation } from '../../Redux/Api/Auth/userApi';



const ChangePassword = ({navigation,route}) => {

const {id} = route.params;
const [showPassword,setShowPassword] = useState(true)
const [showOldPassword,setShowOldPassword] = useState(true)
const [loading,setLoading] = useState(false)
const [ChangeOldPassword] = useChangePasswordMutation()
  const [userData,setUserData] = useState({
    id:id,
    old_password:'',
    new_password:""
  })
  const dispatch = useDispatch()
  const HandleChange= (name,value)=>{
      setUserData({
        ...userData,[name]:value
      })
  }



    const PasswordChange = async()=>{
        setLoading(true)
      if(userData.old_password && userData.new_password){
        const res = await ChangeOldPassword(userData)
          console.log(res)
          if(res.data){
        setLoading(false)
            Alert.alert('Password Updated Successfully')
            navigation.navigate('profile')
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
      label="Old Password"
      placeholder="Password"
      className="w-[300px]"
      secureTextEntry={showOldPassword}
      right={<TextInput.Icon onPress={()=>setShowOldPassword(!showOldPassword)} icon={showOldPassword?"eye":'eye-off'} />}
      onChangeText={(text)=>HandleChange("old_password",text)}
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
       
        <Button onPress={PasswordChange} mode="contained" className="bg-[#FFE505] my-2 rounded font-bold py-1" textColor='black'>
    Reset Password
  </Button>
        </View>
       
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default ChangePassword