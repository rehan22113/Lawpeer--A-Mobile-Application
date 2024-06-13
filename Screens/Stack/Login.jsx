import { View, Text, Pressable, SafeAreaView, ScrollView, Keyboard, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput,Button, IconButton,MD3Colors } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode'
import 'core-js/stable/atob'
import { useDispatch } from 'react-redux';
import { LoginUser } from '../../Redux/Slice/UserAuth';
import { useGetSingleUserMutation, useLoginUserMutation } from '../../Redux/Api/Auth/userApi';
import * as yup from 'yup'
import { Formik } from 'formik';


const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
})


const Login = ({navigation}) => {
  const [showPassword,setShowPassword] = useState(true)
  const [loginUser] = useLoginUserMutation()
  const [userinfo] = useGetSingleUserMutation()
  // const [userData,setUserData] = useState({
  //   email:"",
  //   password:""
  // })
  const dispatch = useDispatch()
  // const HandleChange= (name,value)=>{
  //     setUserData({
  //       ...userData,[name]:value
  //     })
  // }
  const HandleLogin=async(values)=>{
    try {
      Keyboard.dismiss();
      const res =await loginUser(values)
      
      let token =  await res

      if(res.error == undefined){
        // ToastAndroid.show("Login successfull",ToastAndroid.SHORT)
        let decoded = await jwtDecode(token.data.access_token)
        // console.log(decoded.sub.id)
        await AsyncStorage.setItem('token', token.data.access_token);
      const user = await userinfo(decoded.sub.id)
        
        dispatch(LoginUser({id:decoded.sub.id,role:decoded.sub.role,user:user.data,token:token.data.access_token}))
        navigation.navigate("home")
      }else{
        Alert.alert("Invalid Credentials")
      }
    } catch (e) {
      // saving error
      console.log(e,"data async storage error")
    }
  }
  return (
    <SafeAreaView className="flex-1 pt-20 items-center justify-center px-2 h-full w-full bg-white">
<ScrollView keyboardShouldPersistTaps={'always'} className="flex h-auto  ">
    <View className="flex-1 flex w-full items-center justify-center bg-white">
        <View className="px-20 space-y-4">
            <Text className="text-2xl font-bold text-center">Login here</Text>
            <Text className="text-lg font-semibold text-center">Welcome back you've been missed!</Text>
        </View>
        <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              email:"",
              password:""
            }}
            onSubmit={values=>HandleLogin(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values,errors,isValid }) => (
        <View className="pt-10 w-full">

        <View className="gap-2 w-full">

        <TextInput
      mode="outlined"
      label="Email"
      name="email"
      onChangeText={handleChange('email')}
      onBlur={handleBlur('email')}
      value={values.email}
      keyboardType="email-address"
      placeholder="Enter your Email"
      className="w-full"
      // onChangeText={(text)=>HandleChange("email",text)}
    />
    {errors.email &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
       }
     <TextInput
       mode="outlined"
       label="Password"
       name="password"
       placeholder="Password"
      className="w-full"
      secureTextEntry={showPassword}
      right={<TextInput.Icon onPress={()=>setShowPassword(!showPassword)} icon={showPassword?"eye":'eye-off'} />}
      // onChangeText={(text)=>HandleChange("password",text)}
      onChangeText={handleChange('password')}
      onBlur={handleBlur('password')}
      value={values.password}
    />
    {errors.password &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
       }
        </View>
        <Pressable onPress={()=>navigation.navigate('forget_password')}>
        <Text className="text-md font-semibold text-right pb-6 pt-2">Forgot your password?</Text>
        </Pressable>
        <Button mode="contained" className="bg-[#FFE505] rounded font-bold py-1" textColor='black' disabled={!isValid} onPress={handleSubmit}>
    Sign in
  </Button>
  <Pressable onPress={()=>navigation.navigate('selectrole')}>
  <Text className="text-md font-semibold text-center py-4">Create New account</Text>
  </Pressable>
        </View>
            )}
        </Formik>
        {/* <View>
        <Text className="text-md font-semibold text-center py-4">Or continue with</Text>
        <View className="flex flex-row gap-3">
        <View className="bg-gray-200 rounded-md">

        <IconButton
    icon="google"
    iconColor={"black"}
    size={24}
    onPress={() => console.log('Pressed')}
    
  />
        </View>
        <View className="bg-gray-200 rounded-md">
   <IconButton
    icon="facebook"
    iconColor={"black"}
    size={24}
    onPress={() => console.log('Pressed')}
  />
  </View>
        </View>
        </View> */}
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Login