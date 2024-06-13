import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Modal, TextInput } from 'react-native-paper'
import { format } from 'date-fns';
import { useGetSingleUserMutation } from '../../../Redux/Api/Auth/userApi';
import { useSelector } from 'react-redux';
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { useGetStripePaymentIntentMutation } from '../../../Redux/Api/Stripe';
import { ScrollView } from 'react-native-gesture-handler';
import { useDeleteContractMutation, useEndContractMutation, useGetUserContractByIdMutation, useUserContractByIdQuery } from '../../../Redux/Api/contract';

const ContractDetail = ({navigation,route}) => {
  const {item} = route.params;

  const {data:contractById}= useUserContractByIdQuery(item.id)
  const [deleteContract]= useDeleteContractMutation()
  const [review,setReview] = useState(item)
  const [visible, setVisible] = React.useState(false);
  const [lawyerInfo,setLawyerInfo] = useState()
  const [lawyer] = useGetSingleUserMutation()
  const [StripeIntent] = useGetStripePaymentIntentMutation()
  const [endContract] = useEndContractMutation()
  const Role = useSelector(state=>state.userauth.role)
  const user_id = useSelector(state=>state.userauth.id)
  const stripe = useStripe();
   
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);


  const PayContract = async () => {
    try {
      const response = await StripeIntent({
        contract_id: item.id
    })
    console.log(response)
      if (response.error) {
        return Alert.alert(data.message);
      }
      const initSheet = await stripe.initPaymentSheet({
      paymentIntentClientSecret: response.data.clientSecret,
      merchantDisplayName: "LawPeer LTD. Legal Advice",
      });
      if (initSheet.error) {
        console.error(initSheet.error);
        return Alert.alert(initSheet.error.message);
      }
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: response.data.clientSecret,
      }); 
      if (presentSheet.error) {
        console.error(presentSheet.error);
        return Alert.alert(presentSheet.error.message);
      }
      Alert.alert("Payment successfully! Thank you for the purchase.");
      // Update Bitcoin balance & total value
      // setTotalCoins(totalCoins + parseInt(quantity));
      // Reset quantity
      // setQuantity("1");
      navigation.navigate('contracts')
    } catch (err) {
      // console.error(err);
      Alert.alert("Payment failed!");
    }
  };
  
  const DeleteContract=async()=>{
    const res = await deleteContract(item.id)
    console.log(res)
    if(!res.error){
      Alert.alert("","Contract Deleted Successfully")
      navigation.navigate('contracts')
    }else{
      Alert.alert(res.error.data.message)
    }
  }
  
  const CompleteContract=async()=>{
    hideModal()
    const res = await endContract({id:item.id,data:review})
    console.log("complete contract",res)
    if(!res.error){
      navigation.navigate('review',{contract_id:item.id,lawyer_id:item.lawyer_id})
    }else{
      Alert.alert(res.data.error.message)
    }
  }

  const CompletePopup = ()=>{
  //   Alert.alert('Are you satisfied ?', "By completing this contract, you're confirming closure with the lawyer", [
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //     {text: 'Complete', onPress: () => CompleteContract()},
  //   ]);
  }
  const FetchLawyer=async()=>{
    // console.log("=======",contractById)

    let res=null
    if(Role=='client'){
      res= await lawyer(item.lawyer_id)
      setLawyerInfo(res.data)
    }
    
    // console.log(res)
  }

 
  useEffect(()=>{ 
    FetchLawyer()
  },[])
 
  return (
    <StripeProvider publishableKey='pk_test_51Mhb0iIg6h6pS2PojEVoxERI4p4wkUaLE8Vgi81FIgW0LahSmx5HNjuX1O1NpNrzbhoCabbRMgZaeJYUfJZS8M6U00hRmZ6qD2'>
    <ScrollView className="px-2 "> 
    <View>
      <Text className="text-lg font-bold py-2">Contract Detail</Text>
    </View>
    <View className="bg-[#000000bf] divide-y rounded-md">
    <View className="flex p-2 text-white  flex-row justify-between w-full">
        <View>
        <Text className="text-gray-300">Contract id</Text>
        </View>
        <View>
        <Text className="text-gray-200"># {item?.id}</Text>
        </View>
      </View>
      <View className="flex p-2 text-white  flex-row justify-between w-full">
        <View>
        <Text className="text-gray-300">Contract Created</Text>
        </View>
        <View>
        <Text className="text-gray-200">{format(new Date(item?.created),'LLLL d, yyyy')}</Text>
        </View>
      </View>
      {
        Role=='client' ? 
      <View className="flex p-2 text-white  flex-row justify-between w-full">
        <View>
        <Text className="text-gray-300">Lawyer Name</Text>
        </View>
        <View>
        <Text className="text-gray-200">{lawyerInfo?.first_name} {lawyerInfo?.last_name}</Text>
        </View>
      </View>
      :
      <View className="flex p-2 text-white  flex-row justify-between w-full">
        <View>
        <Text className="text-gray-300">Client Id</Text>
        </View>
        <View>
        <Text className="text-gray-200"># {item?.client_id}</Text>
        </View>
      </View>
      }
      <View className="flex p-2 text-white  flex-row justify-between w-full">
        <View>
        <Text className="text-gray-300">Contract Ended On</Text>
        </View>
        <View>
        <Text className="text-gray-200">{item.ended_on?format(new Date(item?.created),'LLLL d, yyyy'):'Not Ended Yet'}</Text>
        </View>
      </View>
      <View className="flex p-2 text-white  flex-row justify-between w-full">
        <View>
        <Text className="text-gray-300">Contract Title</Text>
        </View>
        <View>
        <Text className="text-gray-200">{item.title}</Text>
        </View>
      </View>
     
    </View>
    <View>
      <Text className="text-lg font-bold py-2">Contract  Description</Text>
    </View>
    <View className="bg-[#000000bf] divide-y rounded-md">
    <View className="flex p-2 text-white flex-wrap flex-row justify-between w-full">
        {/* <View>
        <Text className="text-gray-300">Contract Description</Text>
        </View> */}
        <View className="">
        <Text className="text-gray-200">{item.description}</Text>
        </View>
      </View>
      
    </View>
    <View>
      <Text className="text-lg font-bold py-2">Contract Status</Text>
    </View>
    <View className="bg-[#000000bf] divide-y rounded-md">
      <View className="flex p-2 text-white  flex-row justify-between w-full">
        <View>
        <Text className="text-gray-300">Contract Status</Text>
        </View>
        <View>
        <Text className=" text-yellow-500">{item.is_paid?(item.is_ended?'Completed':'Started'):'Pending'}</Text>
        </View>
      </View>
      
    </View>


    <View>
      <Text className="text-lg font-bold py-2">Payment Detail</Text>
    </View>
    <View className="bg-[#000000bf] divide-y rounded-md">
      <View className="flex p-2 text-white  flex-row justify-between w-full">
        <View>
        <Text className="text-gray-300">Amount</Text>
        </View>
        <View>
        <Text className="text-gray-200">Rs {item?.price}/-</Text>
        </View>
      </View>
      <View className="flex p-2 text-white  flex-row justify-between w-full">
        <View>
        <Text className="text-gray-300">Payment status</Text>
        </View>
        <View>
        <Text className="text-gray-200">{!item.is_paid?"Not Paid":'Paid'}</Text>
        </View>
      </View>
      
    </View>

   
   {item.is_paid && !item.is_ended && Role=='client'?
   <View>

    <View className="w-full mt-5">
    <Button onPress={showModal} mode="contained" className="bg-[#FFE505] rounded font-bold py-1" textColor='black'>
    Complete Contract
  </Button>
    </View>
   
   </View>
   :Role=='client' && !item.is_ended?
   <View>

    <View className="w-full mt-10">
    <Button onPress={PayContract} mode="contained" className="bg-[#FFE505] rounded font-bold py-1" textColor='black'>
    Pay Now
  </Button>
    </View>
   
   </View>
   :''}
{Role=='client' && !item.is_paid &&
   <View className="w-full mt-2">
    <Button onPress={DeleteContract} mode="contained" className="text-[#ffb700] rounded font-bold py-1" textColor='black'>
       Deny Request
  </Button>
    </View>
}
{Role=='lawyer' && !item.is_paid &&
   <View className="w-full mt-2">
    <Button onPress={DeleteContract} mode="contained" className="text-[#ffb700] rounded font-bold py-1" textColor='black'>
       Delete Request
  </Button>
    </View>
}

   {item.is_paid?(
    <View className="w-full mt-2">
    <Button onPress={()=>navigation.navigate('new_complain',{c_id:item.id,lawyer_id:item.lawyer_id, client_id:item.client_id})} mode="contained" className="bg-[#FFE505] rounded font-bold py-1" textColor='black'>
    Complain User
  </Button>
    </View>
   ):""}
  
   {item.is_ended && item.review_id == null?(
    <View className="w-full mt-2">
    <Button onPress={()=>navigation.navigate('review',{contract_id:item.id,lawyer_id:item.lawyer_id})} mode="contained" className="bg-[#FFE505] rounded font-bold py-1" textColor='black'>
    Review Lawyer
  </Button>
    </View>
   ):""}
   
   <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        {/* <Image source={require('../../assets/money.png')} className="" /> */}
        <View>
        <TextInput
className=" max-w-full py-2"
mode="outlined"
    multiline={true}
    numberOfLines={10}
   placeholder="Message"
   onChangeText={(text)=>setReview(text)}

/>
        </View>
        <Text className="text-center text-lg font-semibold py-5">By completing this contract, you're confirming closure with the lawyer</Text>
        <Button onPress={CompleteContract} mode="contained" className="bg-[#FFE505] my-2 rounded font-bold py-1" textColor='black'>
    Complete Contract
  </Button>
        </Modal>

    </ScrollView>
    </StripeProvider>
  )
}

export default ContractDetail

const containerStyle = {backgroundColor: 'white', padding: 20};
