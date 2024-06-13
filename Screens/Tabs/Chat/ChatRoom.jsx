import { Image, Pressable, Text, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import ChatRooms from '../../../Components/ChatRooms'
import { TextInput } from 'react-native-paper'
import { useGetUserRoomMutation } from '../../../Redux/Api/chat'
import { useDispatch, useSelector } from 'react-redux'
import { Entypo } from '@expo/vector-icons';
const Users =({navigation})=> {
  const [chatRoom,setChatRoom] = useState([])

  const dispatch = useDispatch()

  const user_id = useSelector(state=>state.userauth.id)
  const [room] = useGetUserRoomMutation();

  const FetchData=async()=>{
      const res= await room(user_id)
      setChatRoom(res.data)
      console.log("chat room data",res)
  }
  useEffect(()=>{
    FetchData()
  },[user_id])
    return (
      <>
      <View className="mt-4">
      {chatRoom?.length>0? <View className=" items-center flex">
        <ChatRooms rooms={chatRoom}/>
      </View>:<View className="h-screen justify-center items-center flex">
        <Text className="text-black text-2xl">No Chat Yet!</Text>
      </View>} 
      </View>
      
      </>
    )
}

export default Users