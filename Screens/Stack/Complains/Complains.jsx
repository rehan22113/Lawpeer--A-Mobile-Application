import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Contracts from '../../../Components/Contract/Contracts'
import { useGetUserContractQuery } from '../../../Redux/Api/contract'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useGetUserComplainMutation } from '../../../Redux/Api/complain'
import AllComplain from '../../../Components/Complain/AllComplain'
import { useSelector } from 'react-redux'

const Complains = () => {
  const [complain,setComplain] = useState([])
    const navigation = useNavigation()
  const user_id = useSelector(state=>state.userauth.id)
  const [complains] = useGetUserComplainMutation();

  const FetchData=async()=>{
      const res = await complains(user_id)
      console.log("chat room data",res)
      if(!res.error)
        setComplain(res.data)
  }
  useEffect(()=>{
    FetchData()
  },[user_id])
  return (
    <View className="flex flex-col justify-center">
      {complain?.length>0? <View className="">
        <AllComplain complain={complain}/>
      </View>:<View className="h-screen justify-center items-center flex">
        <Text className="text-black text-xl">No Complain Yet</Text>
        {/* <Button onPress={()=>navigation.navigate('new_complain')} mode="contained" className="bg-[#FFE505] rounded my-2" textColor='black'>
        <Text className="text-lg">
             Add New ➕
        </Text>
  </Button> */}
      </View>}
    </View>
  )
}

export default Complains