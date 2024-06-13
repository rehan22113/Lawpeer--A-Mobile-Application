import { View, Text, FlatList, Image, Touchable, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useGetTransactionMutation, useGetTransactionDataQuery } from '../../Redux/Api/contract';
import { format } from 'date-fns';

const Wallet = ({navigation}) => {
  const [trans,setTrans] = useState([]);
  const [total,setTotal] = useState(0)
  const [transactions] = useGetTransactionMutation()
  const {data:comingData} = useGetTransactionDataQuery()

 
  const retrive=async()=>{
    console.log(res)
    const res = await transactions()
    setTrans(res.data)
  }


  const TotalAmount=()=>{
       let tt= 0
       console.log(trans)
       trans?.map((item)=>{

         if(!item?.pending){
              console.log(item.amount)
              tt+=item.amount
            }
       })
       setTotal(tt)
  }

  useEffect(()=>{
    retrive() 
  },[comingData])
  
  useEffect(()=>{
    
    TotalAmount()
  },[trans])

  return (
    <View className="">
    <StatusBar/>
    <View className="mb-6 p-2 pt-14 pb-8 bg-[#FFE505]">
    <View className="flex flex-row justify-between py-2">
      <Text className="text-lg font-bold">My Wallet</Text>
      {/* <Image source={{uri:'https://dummyimage.com/300x300'}} className="w-10 h-10 rounded-full" /> */}
    </View>
    <View className="space-y-1">
      <Text className="font-semibold text-lg">Available Balance</Text>
      <Text className="text-3xl font-extrabold">PKR {total}/-</Text>
    </View>

    </View>
    <View className="px-2 flex justify-center items-center"> 
    <Pressable onPress={()=>navigation.navigate('request_money',{id:1})} className="bg-[#FFE505] rounded font-bold pb-2 gap-2 flex justify-center items-center flex-row w-[95%]" textColor='black'>
    <MaterialCommunityIcons name="account-cash" size={24} color="black" />
     <Text className="mr-2 text-lg font-semibold text-gray-900">Request Widthdrawl</Text>
  </Pressable>
    </View>

    <View className="px-2 py-5">
      <Text className="text-lg font-bold">
       Transactions History
      </Text>      
      <FlatList 
          data={trans}
          renderItem={({item})=>(
              <View className={`flex flex-row justify-between items-stretch ${!item.pending?item.transaction_mode=='debit'?'bg-red-200':'bg-green-200':'bg-white'} my-2 p-2 w-full `}>
              <View className="w-[70%]">
                  <Text className="text-bold">{item.description}</Text>
                  <Text className="py-1 text-[10px]">{format(new Date(item?.created),'LLLL d, yyyy')}</Text> 
              </View>
              <View className="flex w-[30%]">
                  <Text className="font-bold ">{item.transaction_mode=='credit'?'+ ':'- '}PKR {item.amount}</Text>
                  <Text className="font-bold text-[10px]">{item.pending?'(Amount Pending)':'(Paid)'}</Text>
              </View>
              </View>
          )}
       />
    </View>
    </View>
  )
}

export default Wallet