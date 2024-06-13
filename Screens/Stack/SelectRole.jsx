import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { RegisterRole } from '../../Redux/Slice/UserAuth'

const SelectRole = ({navigation}) => {
  const dispatch = useDispatch()
  const HandleRole = (role)=>{
      dispatch(RegisterRole(role))
      navigation.navigate("register")
  }
  return (
    <View className="flex-1 items-center justify-center bg-white">
    <View className="absolute top-0 -right-16">
        <Image source={require('../../assets/SelectRole/bgrole.png')}/>
    </View>
      <View>
        <Image 
            source={require('../../assets/SelectRole/role.png')}
            className="object-contain w-40 h-40"
        />
      </View>
        <View className="py-6">

        <View className="px-12 gap-4">
            <Text className="font-bold text-2xl text-center px-4">Select your role to get started.</Text>
            <Text className="text-center">Are you a client seeking legal assistance or a lawyer offering legal services?</Text>
        </View>
        <View className="flex flex-row justify-center gap-8 py-6">
          <Pressable onPress={()=>HandleRole("CLIENT")}>

            <View className="bg-black flex justify-center items-center py-6 px-8 rounded-md space-y-2">
              <Image source={require('../../assets/SelectRole/user.png')}
                className="w-6 h-6"
              />
              <Text className="text-xl font-bold text-white text-center">Client</Text>
            </View>
          </Pressable>
          <Pressable onPress={()=>HandleRole("LAWYER")}>
            <View className="bg-[#FFE505] flex justify-center items-center py-5 px-7 rounded-md space-y-2">
              <Image source={require('../../assets/SelectRole/law.png')}
                className="w-8 h-8"
              />
              <Text className="text-xl font-bold text-black text-center">Lawyer</Text>
            </View>
            </Pressable>
        </View>
    </View>
    </View>
  )
}

export default SelectRole