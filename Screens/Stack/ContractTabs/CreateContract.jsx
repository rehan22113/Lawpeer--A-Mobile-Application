import { Alert, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput,Button } from 'react-native-paper'
import { useSelector } from 'react-redux'
// import { useGetAllUserQuery } from '../../../Redux/Api/Auth/userApi'
import { useAddNewContractMutation } from '../../../Redux/Api/contract'

const CreateContract = ({navigation,route}) => {
//   const [data,setData] = useState([])
const {users} = route.params;
//   const [lawyerList,setLawyerList] = useState([])
  const [addNewContract,setAddNewContract] = useState({
    title: "",
    description: "",
    price: '',
    client_id: ''
  })
  const user_id = useSelector(state=>state.userauth.id)
//   const {data:userData} = useGetAllUserQuery()
  const [AddNewContract] = useAddNewContractMutation()

//   const [showDropDown, setShowDropDown] = useState(false);
//   const [lawyer, setLawyer] = useState("");
  


  const HandleInput = (name,value)=>{
    setAddNewContract({
      ...addNewContract,[name]:value
    })

    // console.log(addNewCompalin)
}
const HandleClient=()=>{
    const client = users.filter(item=>item!=user_id)
    setAddNewContract({...addNewContract,"client_id":client[0]})
}

const SubmitContract=async()=>{
    // console.log("contract clients",client)
    const res = await AddNewContract(addNewContract)
    console.log(res)
    if(res?.data?.client_id){
        Alert.alert('Contract Created Successfully')
        navigation.navigate('contract')
    }
}

useEffect(()=>{
    HandleClient()
},[])
  return (
    <View className="flex-1 items-center justify-start bg-white">
    
    <View className="py-4">
    <View className="gap-2"> 
    <TextInput
  
  mode="outlined"
  label="Title"
  placeholder="Type something"
  className="w-[300px]"
  onChangeText={(text)=>HandleInput("title",text)}
/>
<TextInput
  mode="outlined"
  label="Price"
  placeholder="Price"
  className="w-[300px]"
  onChangeText={(text)=>HandleInput("price",text)}
/>
  
<TextInput
   className=" max-w-[300px]"
   mode="outlined"
   multiline={true}
   numberOfLines={10}
   placeholder="Description"
   onChangeText={(text)=>HandleInput("description",text)}
/>

    </View>
    <View className="py-4">
    <Button mode="contained" className="bg-[#FFE505] rounded font-bold py-1" textColor='black' onPress={SubmitContract}>
    Create a Contract
</Button>
    </View>
    </View>
    
</View>
  )
}

export default CreateContract