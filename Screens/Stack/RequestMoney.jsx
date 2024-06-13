import { View, Text, Pressable, SafeAreaView, ScrollView, Keyboard, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { TextInput,Button, IconButton,MD3Colors, ActivityIndicator, Modal, Portal } from 'react-native-paper';

import 'core-js/stable/atob'
import { useChangePasswordMutation } from '../../Redux/Api/Auth/userApi';



const RequestMoney = ({navigation,route}) => {
    const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

const {id} = route.params;
const [loading,setLoading] = useState(false)
const [ChangeOldPassword] = useChangePasswordMutation()
  const [userData,setUserData] = useState({
    id:id,
    amount:'',
    note:""
  })
  const HandleChange= (name,value)=>{
      setUserData({
        ...userData,[name]:value
      })
  }

  const ConfirmPopup=()=>{

  }

    const PasswordChange = async()=>{
        setLoading(true)
      if(userData.old_password && userData.new_password){
        const res = await ChangeOldPassword(userData)
          console.log(res)
          if(res.data){
        setLoading(false)
            Alert.alert('Password Updated Successfully')
            navigation.navigate('profile')
          }

      }else{
        Alert.alert("Some Fields is Missing")
      }
    }

  return (
    <SafeAreaView className="flex-1 pt-0 items-center justify-center h-full w-full bg-white">
      {
        loading && <View className="fixed z-50 flex flex-1 justify-center items-center">
        <ActivityIndicator />
        </View>
      }
<ScrollView keyboardShouldPersistTaps={'always'} className="flex h-auto w-full px-2 ">
    <View className="flex-1 bg-white w-full">
        
        <View className="pt-10 w-full">
        <View className="gap-2 w-full">

        <TextInput
      mode="outlined"
      label="Payment Amount"
      placeholder="Password"
      className="w-full"
      onChangeText={(text)=>HandleChange("amount",text)}
    />

<TextInput
       mode="outlined"
       label="Payment Note"
       multiline={true}
       numberOfLines={15}
      className="w-full"
       placeholder="Enter Note"
      onChangeText={(text)=>HandleChange("note",text)}
    />
        </View>
       
        <Button onPress={showModal} mode="contained" className="bg-[#FFE505] my-2 rounded font-bold py-1" textColor='black'>
    Request Withdrawal
  </Button>
  <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Image source={require('../../assets/money.png')} className="" />
        <Text className="text-center text-lg font-semibold py-5">Your Request has been submitted it may take some days</Text>
        <Button onPress={()=>navigation.navigate('wallet')} mode="contained" className="bg-[#FFE505] my-2 rounded font-bold py-1" textColor='black'>
    Ok
  </Button>
        </Modal>
      </Portal>
     
        </View>
       
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default RequestMoney