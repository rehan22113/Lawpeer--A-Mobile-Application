import { View, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { LogoutUser } from '../../Redux/Slice/UserAuth'
import { Button } from 'react-native-paper'

const UserSuspended = ({navigation}) => {
  const dispatch = useDispatch()
  const Logout = async()=>{
    const res = await AsyncStorage.removeItem("token")
    console.log(res)
    dispatch(LogoutUser())
    navigation.navigate("login")
  }
  return (
    <View className="flex flex-1 justify-center items-center">
      <Text className="text-2xl font-bold">AccountSuspended</Text>
      <Button onPress={Logout} mode="contained" className="bg-[#FFE505] rounded font-bold py-1" textColor='black'>
          Logout
  </Button>
    </View>
  )
}

export default UserSuspended