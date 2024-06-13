import { View, Text, Pressable, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutUser } from '../../Redux/Slice/UserAuth'
import { Entypo } from '@expo/vector-icons';
import { useGetSingleUserMutation, useUpdateImageMutation, useGetSingleUserByJwtQuery } from '../../Redux/Api/Auth/userApi'
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

 

const Profile = ({navigation,route}) => {
  // const edit = route.params?.edit;
  const [selectedImage, setSelectedImage] = useState(null);
  const [data,setData] = useState({}) 
  const id = useSelector(state=>state.userauth.id)
  const users = useSelector(state=>state.userauth.user)
  // const token = useSelector(state=>state.userauth.token)
  const Role = useSelector(state=>state.userauth.role)
  const [userData, {isLoading,isSuccess}] = useGetSingleUserMutation()
  const singleUser = useGetSingleUserByJwtQuery().data
  const [updateRecord] = useUpdateImageMutation()

  const FetchUser = async()=>{
    const response = await userData(id) 
    console.log(response)
    setData(response.data)
  }

  const dispatch = useDispatch()

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri)
    }
  };

  const uploadImage = async(img) => {
    const formData = new FormData();
    formData.append('profile_image', {
      uri: img,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    console.log(formData)

    const res = await updateRecord({data:formData,id})
   
    console.log(res)
    if(!res.error){
      Alert.alert('Picture Updated')
      FetchUser()
    }


  }


  const DeactivateAccount=()=>{
      navigation.navigate('account_deactivate',{id:id})
  }
  const DeactivatePopup = ()=>{
    Alert.alert('Are you sure you want to deactivate your account?', "This action is irreversible and will remove access to all services. Confirm to proceed with deactivation or cancel to retain access.", [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Deactivate', onPress: () => DeactivateAccount()},
    ]);
  }
    
  const Logout = async()=>{
    const res = await AsyncStorage.removeItem("token")
    console.log(res)
    dispatch(LogoutUser())
    setData(null)
    navigation.navigate("login")
  }

  // useEffect(()=>{
  //   FetchUser() 
  // },[])
  
  useEffect(()=>{
    FetchUser() 
  },[singleUser])
 
  return (
    <ScrollView>

    <View className="flex-1 bg-white container justify-around items-center ">
    {data?.role=='lawyer' &&  (!data?.is_verified || !data?.city || !data?.experience_years || !data?.license_image) ?
      <View className="bg-[#ffd919] p-2 mb-4 top-0 w-full">
        <Text className="text-center font-bold text-gray-600 text-md">
          Your Account features are limited, please complete your profile to get full access
        </Text>
      </View>
      :
      ""
       }
       {data?.role=='client' && (!data?.is_verified || !data.city || !data.occupation) ?
      <View className="bg-[#ffd919] p-2 mb-4 top-0 w-full">
        <Text className="text-center font-bold text-gray-600 text-md">
          Your Account features are limited, please complete your profile to get full access
        </Text>
      </View>
      :
      ""
       }
      <View className="flex justify-center items-center gap-2">

      <View>
      {selectedImage ? (
        
        <Image source={{ uri: selectedImage }} className="w-28 h-28 rounded-full" />
        
      ):(
        <Pressable onPress={pickImage}>
          <View className="relative">
          <View className="p-2 absolute z-30 flex justify-center items-center h-full w-full">
          <Entypo name="upload-to-cloud" size={24} color="white" />
          </View>
          <View className="bg-[#0000006f] rounded-full">

          <Image source={{uri:`${process.env.EXPO_PUBLIC_API_URL}/${data?.profile_image}`}} className="w-28 h-28 rounded-full opacity-60 "/>
          </View>
          </View>
        </Pressable>
      )}

      </View>
        <Text className=" font-bold text-lg">{data?.first_name} {data?.last_name}</Text>
        <Text className="pt-0 mb-6">{data?.email} | {data?.phone_number}</Text>
      </View>
      <View className="gap-3 w-[90%]">

      <View className=" w-full">

      <View className="container space-y-3 px-3 py-4 rounded-md shadow shadow-[#e6e6e6]">
     {Role!='client' &&
      <Pressable onPress={()=>navigation.navigate("lawyerprofile",{lawyerData:data})} className="flex flex-row gap-2">
            <Ionicons name='receipt-outline' size={20} color="black" />
            <Text className="text-md font-semibold">View Profile</Text>
        </Pressable>
     }
        <Pressable onPress={()=>navigation.navigate("edit-profile")} className="flex flex-row gap-2">
            <Ionicons name='receipt-outline' size={20} color="black" />
            <Text className="text-md font-semibold">Edit Profile Information</Text>
        </Pressable>
        {Role=='lawyer'?(
        <Pressable onPress={()=>navigation.navigate('skills')} className="flex flex-row gap-2">
        <Foundation name="social-skillshare" size={20} color="black" />
            <Text className="text-md font-semibold">Add/Update Skills</Text>
        </Pressable>
      ):('')
        }
        <Pressable onPress={()=>navigation.navigate("change_password",{id:id})} className="flex flex-row gap-2">
            <Ionicons name='receipt' size={20} color="black" />
            <Text className="text-md font-semibold">Change Your Password</Text>
        </Pressable>
        
        <View className="flex flex-row justify-between">
        <View className="flex flex-row gap-2 flex-wrap">
            <Ionicons name='wallet-outline' size={20} color="black" />
            <Text className="text-md font-semibold">Email ({data?.email}) </Text>
        </View>

        
        <View>
          {data?.is_verified?<Text className="text-green-700">Verified</Text>:<Pressable onPress={()=>navigation.navigate('verify_email',{email:data.email})}><Text className="underline text-blue-700">Verify</Text></Pressable>}
        </View>
        </View>
      </View>
      <View>
      
      </View>
      </View>
      <View className="w-full">

      <View className="container space-y-1 px-3 py-4 rounded-md shadow shadow-[#e6e6e6]">
        <Pressable onPress={()=>navigation.navigate("complain")} className="flex flex-row gap-2">
            <Ionicons name='albums-outline' size={20} color="black" />
            <Text className="text-md font-semibold">Report / Complains</Text>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate("contact")} className="flex flex-row gap-2">
            <Ionicons name='information-circle-outline' size={20} color="black" />
            <Text className="text-md font-semibold">Contact us</Text>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate("privacy_policy")} className="flex flex-row gap-2">
            <Ionicons name='lock-open-outline' size={20} color="black" />
            <Text className="text-md font-semibold">Privacy Policy</Text>
        </Pressable>
        
      </View>
      <View>
      <View className="container space-y-1 px-3 py-4 rounded-md shadow shadow-[#e6e6e6]">
        <Pressable onPress={Logout} className="flex flex-row gap-2">
            <Ionicons name='log-out-outline' size={20} color="red" />
            <Text className="text-red-500">Logout</Text>
        </Pressable>
       
        
      </View>
      <View className="container space-y-1 px-3 py-4 rounded-md shadow shadow-[#e6e6e6]">
        <Pressable onPress={DeactivatePopup} className="flex flex-row gap-2">
            <Ionicons name='log-out-outline' size={20} color="red" />
            <Text className="text-red-500">De-Activate Account</Text>
        </Pressable>
       
        
      </View>
      </View>
      </View>
      </View>

    </View>
    </ScrollView>

  )
}

export default Profile