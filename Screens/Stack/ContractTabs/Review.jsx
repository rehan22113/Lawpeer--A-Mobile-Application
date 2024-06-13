import { View, Text, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';
import { useAddReviewMutation } from '../../../Redux/Api/contract';
import { ScrollView } from 'react-native-gesture-handler';

const Review = ({navigation,route}) => {
  const {contract_id,lawyer_id} = route.params;
  const [sendReview] = useAddReviewMutation()
  const [addNewReview,setAddNewReview] = useState({
    contract_id: contract_id,
    rating: "",
    review_text: '',
    lawyer_id: lawyer_id
  })

  const HandleInput = (name,value)=>{
    setAddNewReview({
      ...addNewReview,[name]:value
    })
    // console.log(addNewCompalin)
}
const handleClick = (value) => {
  // If the clicked star is the same as the current rating, reset to 0
  const newRating = value === addNewReview.rating ? 0 : value;
  setAddNewReview({...addNewReview,["rating"]:newRating});
}

const SubmitReview =async()=>{
  if(addNewReview.rating && addNewReview.review_text && addNewReview.contract_id && addNewReview.lawyer_id){
    console.log(addNewReview)
    const res = await sendReview(addNewReview)
    console.log(res)
    if(!res.error){
      Alert.alert("Thanks for your Review","Lawpeer appreciates you for this lawyer's assessment")
      navigation.navigate('Contract')
    }else{
      Alert.alert("",res.error.data.error)
      navigation.navigate('contracts')

    }
  }else{
    Alert.alert("Some fields are missing")
  }
}

  return (
    <ScrollView keyboardShouldPersistTaps="always" className="bg-[#1b1b1b]">

    <View className="  flex h-screen justify-around py-20 items-center flex-1">
    <View className="flex justify-center items-center">
      <Text className="text-white text-2xl">Review</Text>
      <Text className="text-white">Kindly Share your review on this contract</Text>
    </View>
    <View className="gap-2 w-full px-2"> 
    <View className="flex flex-row justify-center items-center py-5">
    {[1, 2, 3, 4, 5].map((value) => (
        <Pressable key={value} onPress={()=>handleClick(value)}>
    <AntDesign name="star" size={40} color={value <= addNewReview.rating ? 'gold' : 'white'} />
    </Pressable>
      ))}
   
    
   

    </View>
  
<TextInput
   mode="outlined"
   multiline={true}
   numberOfLines={10}
   textColor='white'
   placeholder="Type Your Review"
   className="w-full text-white bg-black p-2"
   onChangeText={(text)=>HandleInput("review_text",text)}
/>

    </View>

    <View className="py-4 w-full px-2">
    <Button onPress={SubmitReview} mode="contained" className="bg-[#FFE505] w-full rounded font-bold py-1" textColor='black' >
      Submit a Review
    </Button>
    </View>
    </View>
    </ScrollView>
  )
}

export default Review