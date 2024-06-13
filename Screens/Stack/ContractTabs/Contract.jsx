import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Contracts from '../../../Components/Contract/Contracts'
import { useGetUserContractDataMutation, useGetUserContractQuery } from '../../../Redux/Api/contract'

const Contract = () => {
  const [contract,setContract] = useState([])

  // const user_id = useSelector(state=>state.userauth.id)
  const {data:contracts} = useGetUserContractQuery();
  const [allcontracts] = useGetUserContractDataMutation();

  const FetchData=async()=>{
    // console.log("chat room data",contracts)
    const res = await allcontracts()
    console.log(res)
      setContract(res.data)
  }
  useEffect(()=>{
    FetchData()
  },[contracts])
  return (
    <View className="flex flex-col justify-center">
      {contract?.length>0? <View className="">
        <Contracts contracts={contract}/>
      </View>:<View className="h-screen justify-center items-center flex">
        <Text className="text-black text-2xl">No Contract Yet!</Text>
      </View>}
    </View>
  )
}

export default Contract