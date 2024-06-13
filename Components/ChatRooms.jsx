import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
// import { useGetSingleUserMutation } from '../Redux/Api/Auth/userApi';


const ChatRooms = ({rooms}) => {
    const navigation= useNavigation()
    const userData = useSelector(state=>state.userauth.user)
    // const [lawyerData] = useGetSingleUserMutation()
    // const [lawyerInfo,setLawyerInfo] = useState()

    // const getLawyerInfo=async(data)=>{
    //     console.log("onfo",data)
    //   const res = await lawyerData(data.user_ids[1])
    //     // setLawyerInfo(res.data)
    //     return 
    // }
    // useEffect(()=>{  
    //     console.log()
    //     // getLawyerInfo()
    // },[])
   
  return (
    <View className="mt-8">
        <FlatList
            className="w-full" 
            data={rooms}
            renderItem={(item)=>(
<Pressable onPress={()=>navigation.navigate('chat',{room_name: item.item.name,username:userData?.email,users:item.item.user_ids})} className="px-2 mt-2 mb-1 flex flex-row items-center justify-between w-full bg-gray-200 rounded-md">
        <View className="w-[20%]">
                <Image style={styles.img} className="h-12 w-12 rounded-full mx-auto my-4"
                     source={{uri:'https://dummyimage.com/200x200'}} />
                </View>
                <View className="w-[65%] flex">
                    {item.item.user_names?.map(name=>{
                        if(name!==`${userData?.first_name} ${userData?.last_name}`){
                             return (
                    <Text key={item.item} className="font-bold text-lg text-gray-600 mb-1">
                            {name}
                    </Text>
                            )
                        }
                    })}
                    <Text className="inline-flex text-gray-700">
                        {item.item.last_message}
                    </Text>
                </View>
                <View className="w-[12%] flex">
                <Entypo name="dot-single" size={32} color="green" />
                </View>
            </Pressable>
            )}
            keyExtractor={(item) => item.id}
            
        />
         
    </View>
  )
}

export default ChatRooms

const styles = StyleSheet.create({
    img: {
        shadowColor: '#0000',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 10,
        overflow: "visible"
      },
})