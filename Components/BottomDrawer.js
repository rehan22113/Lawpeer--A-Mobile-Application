import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, SafeAreaView, Pressable } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native-paper';
import { Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useGetLawyerQuery } from '../Redux/Api/Auth/lawyerApi';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

// const DATA = [
//   {
//     id: '01',
//     url:"https://randomuser.me/api/portraits/men/37.jpg",
//     name: 'Muhammad Rehan',
//     rating:5,
//     isAvailable:true
//   },
//   {
//     id: '02',
//     url:"https://randomuser.me/api/portraits/men/20.jpg",
//     name: 'Umer Mehmood',
//     rating:5,
//     isAvailable:false
//   },
//   {
//     id: '03',
//     url:"https://randomuser.me/api/portraits/men/21.jpg",
//     name: 'Shahid Ullah',
//     rating:5,
//     isAvailable:true
//   },
//   {
//     id: '04',
//     url:"https://randomuser.me/api/portraits/men/37.jpg",
//     name: 'Shazaib ahmed',
//     rating:5,
//     isAvailable:true
//   },
//   {
//     id: '05',
//     name: 'Muhammad Rehan',
//     rating:5,
//     isAvailable:true
//   },
//   {
//     id: '06',
//     url:"https://randomuser.me/api/portraits/men/37.jpg",
//     name: 'Muhammad Rehan',
//     rating:5,
//     isAvailable:true
//   },
// ];

const BottomDrawer = ({ModalShow,ModalHide,filterlawyers:allLawyer,searchText}) => {

  const navigation = useNavigation()
  // const {data:allLawyer} = useGetLawyerQuery()
  // ref
  const bottomSheetRef = useRef(null);


  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View className="w-full px-3 py-1">
            <View className="">
        <TextInput
               mode="outlined"
      label="Search by lawyer name ..."
      onChangeText={text => searchText(text)}
    />
            </View>
            <View className="p-2 w-full">
            <View className="flex flex-row justify-between py-2"> 

          <Text>Search Result 🎉</Text>
          <Pressable onPress={()=>ModalShow()}>
          <FontAwesome5 name="filter" size={24} color="black" />
          </Pressable>
            </View>
      <View className="h-60">
      {allLawyer ?(

      <BottomSheetFlatList
      className="h-full"
        style={{paddingHorizontal:2}}
        data={allLawyer}
        renderItem={({item}) => <Pressable onPress={()=>navigation.navigate('lawyerprofile',{lawyerData:item})} className="flex items-center flex-row gap-2 my-1 pb-2 rounded-md shadow-lg bg-gray-100">
           <View>

            <Image 
          source={{uri:item.profile_image?`${process.env.EXPO_PUBLIC_API_URL}/${item.profile_image}`:'https://dummyimage.com/200x200'}}
          className="w-10 h-10 ml-2 rounded"
        />
           </View>
            <View className="flex">
                <Text>{item.first_name} {item.last_name}</Text>
                <View className="flex flex-row gap-1">
                
                {item.average_rating>0 ? [1, 2, 3, 4, 5].map((value) => (
        <View key={value}>
    <AntDesign name="star" size={16} color={value <= item.average_rating ? 'gold' : 'black'} />
    </View>
      )):<Text className="">No Reviews</Text>}
                
                </View>
                <View className="flex flex-row justify-between ">
                <Text className=" text-sm"> {item?.experience_years} {item?.experience_years&&'Year of Experience'}
                </Text>
                {/* <View>
                <Ionicons name="star" size={16} color="#FFE505" />
                </View> */}
                </View>

            </View>
            </Pressable>}
        keyExtractor={item => item.id}
      />
      ):<View className="flex justify-center items-center h-52"><Text className="text-center">Oops! No Lawyer Found </Text></View>}

            </View>
      </View>
        </View>
      </BottomSheet>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
    
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomDrawer;