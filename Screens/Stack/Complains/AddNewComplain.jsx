import { Alert, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput,Button } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { useGetAllUserQuery } from '../../../Redux/Api/Auth/userApi'
import DropDown from 'react-native-paper-dropdown'
import { useAddNewComplainMutation } from '../../../Redux/Api/complain'

const AddNewComplain = ({navigation,route}) => {
  const {c_id,lawyer_id,client_id} = route.params;
  const [data,setData] = useState([])
  const [lawyerList,setLawyerList] = useState([])
  // const id = useSelector(state=>state.userauth.id)
  const [addNewComplain,setAddNewComplain] = useState({
    subject: "",
    description: "",
    contract_id: c_id,
    lawyer_id: lawyer_id,
    client_id:client_id
  })
  const Role = useSelector(state=>state.userauth.role)
  const {data:userData} = useGetAllUserQuery()
  const [AddNewComplain] = useAddNewComplainMutation()

  // const [showDropDown, setShowDropDown] = useState(false);
  const [lawyer, setLawyer] = useState("");
  // const [client, setClient] = useState("");


  // const FetchUser = async()=>{
  //   let laywerArr =[]
  //   let clientArr =[]
  //   userData.map(item=>{
  //     if(item.role=='lawyer'){
  //       laywerArr.push({
  //         label: `${item.first_name} ${item.last_name} (${item.id})` ,
  //         value: item.id
  //       })
  //     }else{
  //       clientArr.push({
  //         label: `${item.first_name} ${item.last_name} (${item.id})` ,
  //         value: item.id
  //       })
  //     }
  //   })
  //   // console.log(laywerArr)
  //   if(Role=='client'){
  //     setLawyerList(laywerArr)
  //   }else{
  //     setLawyerList(clientArr)
  //   }
  // }

  const HandleInput = (name,value)=>{
    setAddNewComplain({
      ...addNewComplain,[name]:value
    })

    // console.log(addNewCompalin)
}

const SubmitComplain=async()=>{

    // setAddNewComplain({...addNewComplain,"lawyer_id":lawyer})
    if(addNewComplain.client_id && addNewComplain.contract_id && addNewComplain.description && addNewComplain.lawyer_id && addNewComplain.subject){

      const res = await AddNewComplain(addNewComplain)
      console.log(addNewComplain)
      
      console.log(res)
      if(!res.error){
        Alert.alert('Complain Create Successfully')
        navigation.navigate('complain')
      }else{
       if(!res.error){
         Alert.alert(res.data.error.message)
        }else{
         Alert.alert(res.error.data.error)
        }
        
      }
    }else{
      Alert.alert("Some fields missing")
      console.log(addNewComplain)
    }
}

  // useEffect(()=>{
  //   FetchUser()
  // },[userData])
  return (
    <View className="flex-1 items-center justify-start bg-white">
    
    <View className="py-4 w-full px-2">
    <View className="gap-2 w-full"> 
    <TextInput
  
  mode="outlined"
  label="Subject"
  placeholder="Type something"
  className="w-full"
  onChangeText={(text)=>HandleInput("subject",text)}
/>
{/* <TextInput
  mode="outlined"
  label="Contract ID"
  placeholder="Enter ID of User"
  className="w-[300px]"
  onChangeText={(text)=>HandleInput("contract_id",text)}
/> */}
  {/* <View>
      <DropDown
        label={"Select Lawyer"}
        mode={"outlined"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={lawyer}
        setValue={setLawyer}
        list={lawyerList}
      />
  </View> */}
<TextInput
className=" max-w-full py-2"
mode="outlined"
    multiline={true}
    numberOfLines={10}
   placeholder="Message"
   onChangeText={(text)=>HandleInput("description",text)}

/>

    </View>
    <View className="py-4">
    <Button mode="contained" className="bg-[#FFE505] rounded font-bold py-1" textColor='black' onPress={SubmitComplain}>
    Create a Complain
</Button>
    </View>
    </View>
    
</View>
  )
}

export default AddNewComplain