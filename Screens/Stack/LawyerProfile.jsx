import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Modal, Portal } from 'react-native-paper'
import LawyerReviews from '../../Components/LawyerReviews'
import { useNavigation } from '@react-navigation/native'
import { useCreateNewRoomMutation, useGetRoomByNameMutation } from '../../Redux/Api/chat'
import { useSelector } from 'react-redux'
import { useGetAllLawyerReviewQuery } from '../../Redux/Api/contract'
import { FlatList } from 'react-native-gesture-handler'

const LawyerProfile = ({route}) => {
  const navigation = useNavigation()
  const {lawyerData} = route.params;
  const [createRoom] = useCreateNewRoomMutation()
  const [roomByName] = useGetRoomByNameMutation()
  const {data:review} = useGetAllLawyerReviewQuery(lawyerData.id)
  const [reviews,setReviews] = useState([])
  const userinfo = useSelector(state=>state.userauth)
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const RetriveReview=()=>{
    setReviews(review)
  }

  const sendMessage=async()=>{
    // ()=>navigation.navigate('chat')
    // console.log("====userinfo",userinfo,lawyerData)
    const data = {
        name:`${userinfo.user.username}_${lawyerData.username}`,
        user_ids:[userinfo.id,lawyerData.id]
    }
      const roomId = await roomByName(`${userinfo.user.username}_${lawyerData.username}`)
    //   console.log("after room",roomId)
        if(!roomId.error){
            console.log(roomId)
            navigation.navigate('chat',{room_name:roomId.data.name,username:userinfo.user.email})
        } else{
            const res = await createRoom(data)
            // console.log("new created",res)
            navigation.navigate('chat',{room_name:res.data.name,username:userinfo.user.email})
        }
  }

  useEffect(()=>{
        RetriveReview()
        console.log(review)
  },[review])
  return (
    <View className="px-2 h-screen pt-2 overflow-hidden shadow-lg">
        <View className=" px-4 pb-3">
            <View className="text-center mt-4 mb-1">
                <Image className="h-28 w-28 rounded-full mx-auto my-4"
                     source={{uri:lawyerData.profile_image?`${process.env.EXPO_PUBLIC_API_URL}/${lawyerData.profile_image}`:'https://dummyimage.com/200x200'}} />
                <View className="py-2 flex justify-center items-center">
                    <Text className="font-bold text-2xl text-gray-800 dark:text-white mb-1">{lawyerData?.first_name} {lawyerData?.last_name}</Text>
                    <Text className="inline-flex text-gray-700  items-center">
                        {/* <svg class="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1" fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path class=""
                                d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                        </svg> */}
                        {lawyerData?.address}
                    </Text>
                    <Text className="inline-flex text-gray-900 font-bold  items-center">
                        
                        Average Rating: {lawyerData?.average_rating}/5
                    </Text>
                    <Pressable onPress={()=>showModal()}>
                    <Text className="inline-flex py-2 underline text-gray-900 font-bold  items-center">                     
                        View license
                    </Text>
                    </Pressable>
                </View>
                {lawyerData?.id !=userinfo.id &&
                <View className="flex flex-row px-10 gap-2">
               
               <Button mode="contained" onPress={sendMessage} className="bg-[#FFE505] rounded font-bold border w-full shadow-lg " textColor='black' >Send a Message</Button>
               
           </View> 
                }
            </View>
           
        </View>
        <View>
        <View className="px-4 py-2">
            <View className="flex gap-2 text-gray-800 dark:text-gray-300 mb-1">
                
                <Text className="text-black font-bold">About</Text>
            </View>
            <View class="flex">
                <View class="flex justify-end mr-2">
                    <Text>{lawyerData.about?lawyerData.about:'No Information'}</Text>
                </View>
            </View>
        </View>
        <View className="px-4 py-2">
            <View className="flex gap-2 text-gray-800 dark:text-gray-300 mb-1">
                
                <Text className="text-black font-bold">Experience</Text>
            </View>
            <View className="flex">
                <View className="flex justify-end mr-2">
                    <Text>{lawyerData.experience_years?lawyerData.experience_years+' Year':'Not Yet'}</Text>
                </View>
            </View>
        </View>
        <View className="px-4 py-2">
            <View className="flex gap-2 text-gray-800 dark:text-gray-300 mb-1">
                
                <Text className="text-black font-bold">{reviews?.length} Reviews</Text>
            </View>
            <View className="flex">
           

            {/* Review List */}
               
            <View>

                <FlatList 
                className="h-48"
                    data={reviews}
                    renderItem={({item})=><LawyerReviews item={item}/>
                    
                    }
                />
                        
            </View>
            </View>
            
        </View>
        </View>

        <Portal onPress={hideModal}>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Image source={{uri:lawyerData.license_image?`${process.env.EXPO_PUBLIC_API_URL}/${lawyerData.license_image}`:'https://dummyimage.com/200x200'}} className="w-full h-[200px] object-contain resize-x" />
        </Modal>
      </Portal>

    </View>
  )
}

export default LawyerProfile
