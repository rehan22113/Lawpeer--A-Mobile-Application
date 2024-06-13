import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'

const Start = ({navigation}) => {
  return (
    <View className="bg-[#FFE505] flex-1 justify-around items-center w-full pt-20">
    <View className="pt-20 pb-0">
      <Image 
        source={require('../../assets/main/lawpeer.png')}
        className="w-44 h-44 object-fill"
      />
    </View>
    <View className="flex w-full px-10">
      <View className="pb-10">

      <Text className="text-3xl font-bold">Welcome to Legal Ease</Text>
      <Text className="text-[16px] leading-loose mt-2 font-medium">Your Trusted Legal Companion</Text>
      </View>
      <View className="flex flex-row justify-between items-center">
        <Image 
          source={require('../../assets/main/dots.png')}
          className=""
        />
        <Pressable onPress={()=>navigation.navigate('selectrole')}>
        <Image 
          source={require('../../assets/main/next.png')}
          className="w-12 h-12"
        />
        </Pressable>
      </View>
    </View>
      
    </View>
  )
}

export default Start