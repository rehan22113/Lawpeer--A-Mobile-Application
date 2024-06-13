import { View, Text, Pressable, StyleSheet, KeyboardAvoidingView, Touchable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView,{Callout, Marker} from 'react-native-maps'
import BottomDrawer from '../../Components/BottomDrawer';
import { Image } from 'expo-image';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Button, Chip, Modal, Portal, TextInput } from 'react-native-paper';
import { useFilterLawyerMutation, useGetSkillsQuery } from '../../Redux/Api/Auth/lawyerApi';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Home = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [lawyers,setLawyers] = useState([])
  const [skills,setSkills] = useState([])
  const [selectSkills,setSelectSkills] = useState([])
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20  };
  const {data:getSkill} = useGetSkillsQuery()
  const [FilterLawyer] = useFilterLawyerMutation()
  const [searchByLawyerName,setSearchByLawyerName] = useState()

  const [filter,setFilter] = useState({
    "city": "",
     "skill_ids": [],
    "above_average_rating": '',
    "above_experience_years": ''
})

  const SearchByText=async(text)=>{
    if(text!=''){
      const res = lawyers.filter(item=> `${item.first_name+" "+item.last_name}`.includes(text))
      setLawyers(res)
    }else{
      const res = await FilterLawyer(filter)
      setLawyers(res.data)
    }
    }

  const FetchSkills = async()=>{
    setSkills(getSkill)
  }

  const handleReviews = (value) => {
    // If the clicked star is the same as the current rating, reset to 0
    const newRating = value === filter.above_average_rating ? 0 : value;
    setFilter({...filter,["above_average_rating"]:newRating});
  }

  const HandleSkills = (item) =>{
    // console.log(filter.skill_ids.some(obj=>obj[id]==item.id))
    if( !filter.skill_ids?.some(obj=>obj==item.id)){
        setFilter({...filter,skill_ids:[...filter.skill_ids,item.id]})
    }else{
      setFilter({...filter,skill_ids:filter.skill_ids.filter(obj=>obj!=item.id)})
    }

    
  }

  const SubmitFilter = async()=>{
      const res = await FilterLawyer(filter)
      console.log(res)
      setLawyers(res?.data)
      getBounds(res.data)

  }


  function getBounds(markers) {
    const latitudes = markers.map((lawyer) => lawyer.latitude);
    const longitudes = markers.map((lawyer) => lawyer.longitude);
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLon = Math.min(...longitudes);
    const maxLon = Math.max(...longitudes);
    const deltaLat = maxLat - minLat;
    const deltaLon = maxLon - minLon;
    // console.log(markers,latitudes,longitudes,minLat,minLon,deltaLat)
    setmapRegion({
      latitude: (minLat + maxLat) / 2,
      longitude: (minLon + maxLon) / 2,
      latitudeDelta: deltaLat + 1.2,
      longitudeDelta: deltaLon + 1.2,
    })
  }


  // const initialRegion =;

  const [mapRegion, setmapRegion] = useState ({
  });

  useEffect(()=>{
    SubmitFilter()
    FetchSkills()
  },[getSkill])

  const mapRef = useRef();

  // Call fitToSuppliedMarkers() method on the MapView after markers get updated
  // useEffect(() => {
  //   if (mapRef.current) {
  //     // console.log(mapRef.current)
  //     mapRef.current.fitToSuppliedMarkers(lawyers.map((item) => item.id));
  //   }
  // }, [lawyers]);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <MapView ref={mapRef} region={mapRegion} className="flex-1 flex w-full h-full self-stretch" >
      {lawyers?.map(item=>(  
       <Marker key={item.id} className="flex justify-center items-center border border-[#212121]"
        coordinate={{
          latitude: item.latitude,
          longitude: item.longitude,
        }} 
    pinColor={ 'blue' }
    onCalloutPress={() => alert('Clicked')} 
    onMapReady={() => {
    if (mapRef.current) {
      const coordinates = lawyers.map((lawyer) => ({
        latitude: lawyer.latitude,
        longitude: lawyer.longitude,
      }));
      mapRef.current.fitToCoordinates(coordinates, { animated: true });
    }
  }}
    >
    <View>

<View className="flex bg-white px-2 items-center flex-row gap-4 py-2  rounded-md ">
    <Pressable>

            <Image 
          source={{uri:item.profile_image?`${process.env.EXPO_PUBLIC_API_URL}/${item.profile_image}`:'https://dummyimage.com/200x200'}}
          className="w-10 h-10"
        />
    </Pressable>
            <View className="flex">
                <Text className="text-md font-semibold">{item.first_name} {item.last_name}</Text>
                <View className="flex flex-row gap-1">
                
                {item.average_rating>0 ? [1, 2, 3, 4, 5].map((value) => (
        <View key={value}>
    <AntDesign name="star" size={16} color={value <= item.average_rating ? 'gold' : 'black'} />
    </View>
      )):<Text className="">No Reviews</Text>}
                
                </View>
                

            </View>
            </View>
    </View>
            <View className="-mt-5">
            <AntDesign name="caretdown" size={30}  color="white" />
            </View>
      <Image source={require('../../assets/marker.png')} className="w-10 h-10"/>
    </Marker>
      ))}
       
      </MapView>

      <BottomDrawer searchText={SearchByText} filterlawyers={lawyers} ModalShow={showModal} ModalHide={hideModal}/>



      {/* ==== Filter Popup === */}

      <Portal >
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          {/* <View>
      <DropDown
        label={"Select Lawyer"}
        mode={"outlined"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={skills}
        setValue={setLawyer}
        list={getSkill}
      />
  </View> */}
      <KeyboardAwareScrollView>
  <View className="p-2">
    <Text className="text-md font-bold pb-1">Filter By City</Text>
    <TextInput
      mode="outlined"
      placeholder="Search By city"
      className="w-full"
      onChangeText={(text)=>setFilter({...filter,city:text})}
    />
  </View>

  <View className="p-2">
    <Text className="text-md font-bold">Filter By Rating</Text>
  </View>
  <View className="flex flex-row items-center pb-2">
    {[1, 2, 3, 4, 5].map((value) => (
        <Pressable key={value} onPress={()=>handleReviews(value)}>
    <AntDesign name="star" size={32} color={value <= filter.above_average_rating ? 'gold' : 'black'} />
    </Pressable>
      ))}
   
    
   

    </View>
  <View className="p-2">
    <Text className="text-md font-bold">Filter By Skills</Text>
  </View>
  <View className="flex flex-row flex-wrap gap-2 p-2">

    {skills && skills.map((item)=>(
      <Chip key={item.id} icon={filter.skill_ids && filter.skill_ids?.some(obj=>obj==item.id)?"trash-can-outline":'plus'} mode={filter.skill_ids.some(obj=>obj==item.id)?'flat':'outlined'} onPress={()=>HandleSkills(item)}>{item.name}</Chip>
    ))}
    </View>  
    <View className="p-2">
    <Text className="text-md font-bold pb-1">Filter By Experience</Text>
    <TextInput
      mode="outlined"
      placeholder="Experiece in years eg. 12"
      className="w-full"
      onChangeText={(text)=>setFilter({...filter,above_experience_years:text})}
    />
  </View>
        <Button onPress={()=>{SubmitFilter();hideModal();}} mode="contained" className="bg-[#FFE505] my-2 rounded font-bold py-1" textColor='black'>
        <FontAwesome5 name="filter" size={20} color="black" />
          Filter
  </Button>
      </KeyboardAwareScrollView>
        </Modal>
      </Portal>

    </View>
  )
}

export default Home

const style = StyleSheet.create({
   boxShadow:{
    shadowColor: "black",
    shadowOffset: {
        width: 0,
        height: -20,
    },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
   }
})


{/* <Marker coordinate={{
    latitude: 32.38825,
    longitude: 71.4320,
    latitudeDelta: 0.1922,
    longitudeDelta: 0.2421,
  }} title='Sr. Adv. Rehan' >
    <Callout>
    <View className="flex items-center flex-row gap-4 my-1 py-2 rounded-md shadow shadow-1-ns">
            <Image 
          source={{uri:'https://dummyimage.com/200x200'}}
          className="w-10 h-10"
        />
            <View className="flex">
                <Text>Lawyer Name</Text>
                <View className="flex flex-row gap-1">
                
                <Ionicons name="star" size={16} color="#FFE505" />
                <Ionicons name="star" size={16} color="#FFE505" />
                <Ionicons name="star" size={16} color="#FFE505" />
                <Ionicons name="star" size={16} color="#FFE505" />
                <Ionicons name="star" size={16} color="#FFE505" />
                
                </View>
                <View className="flex flex-row justify-between ">
                <Text>{"Not Available"}</Text>
                
                </View>

            </View>
            </View>
    </Callout>
  </Marker> */}