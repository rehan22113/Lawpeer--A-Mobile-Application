import { View, Text,Pressable, SafeAreaView, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput,Button, IconButton,MD3Colors } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useRegisterClientMutation } from '../../Redux/Api/Auth/clientApi';
import { useRegisterLawyerMutation } from '../../Redux/Api/Auth/lawyerApi';
import * as Location from 'expo-location';
import validation_strings from '../../utils/validation_strings';
import { Formik } from 'formik';
import * as yup from 'yup'
const signUpValidationSchema = yup.object().shape({
  first_name: yup
    .string()
    .max(30, validation_strings().max_msg(30))
    .matches(validation_strings().chars_only_chk, validation_strings().chars_only_msg)
    .required('First name is required'),
    last_name: yup
    .string()
    .max(30, validation_strings().max_msg(30))
    .required('last name is required'),
    username: yup
    .string()
    .max(25, validation_strings().max_msg(25))
    .required('username is required'),
    address: yup
    .string()
    .min(15, validation_strings().min_msg(15))
    .required('address is required'),
  phone_number: yup
    .string()
    .matches(validation_strings().phone_no_check, validation_strings().phone_no_msg)
    .required(validation_strings().required_msg),
   email: yup
    .string()
    .email("Please enter valid email")
    .required('Email is required'),
    bar_voter_number: yup
    .string(),
    cnic: yup
    .string()
    .matches(
      validation_strings().numbers_only_chk,
      validation_strings().numbers_only_msg
    )
    .max(13, validation_strings().max_msg(13))
    .min(13, validation_strings().min_msg(13))
    .required('Cnic is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
})

const Register = ({navigation}) => {
  const Role = useSelector(state=>state.userauth.role)
  const [registerClient,clientResult] = useRegisterClientMutation()
  const [registerLawyer] = useRegisterLawyerMutation()
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword,setShowPassword] = useState(true)
  const [showConfirmPassword,setShowConfirmPassword] = useState(true)


  // const [userRecord,setUserRecord] = useState({
  //   password:"",
  //   phone_number:"",
  //   email:"",
  //   username:"",
  //   first_name:"",
  //   last_name:"",
  //   address:'',
  //   dob:'',
  //   role:Role,
  //   latitude:'',
  //   longitude:''
  //   })  
  
    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
      console.log(location)
    }, []);

  // const HandleInput = (name,value)=>{
  //     setUserRecord({
  //       ...userRecord,[name]:value
  //     })

  //     // console.log(userRecord)
  // }

  const RegisterRecord = async(values)=>{
    // const data = await datas(2)
    // console.log(data)
    try{
      const userFormData = new FormData()
      // Object.keys(userRecord).forEach(keys=>{
        userFormData.append("password",values.password)
        userFormData.append("first_name",values.first_name)
        userFormData.append("last_name",values.last_name)
        userFormData.append("email",values.email.toLowerCase())
        userFormData.append("phone_number",values.phone_number)
        userFormData.append("username",values.username)
        userFormData.append("address",values.address)
        userFormData.append("longitude",location.coords.longitude)
        userFormData.append("latitude",location.coords.latitude)
        userFormData.append("cnic",values.cnic)
        userFormData.append("bar_voter_number",values.bar_voter_number)
        userFormData.append("role",Role)
      // })
      console.log("form records",userFormData)
    if(values.password == values.confirm_password ){
        let res=""
        // console.log(location.coords.longitude, location.coords.latitude)
        if(location.coords.longitude && location.coords.latitude){

        if(Role=="CLIENT"){
          
          res = await registerClient(userFormData)
        }
        else if(Role=="LAWYER"){
        res = await registerLawyer(userFormData)

      }
    }else{
      Alert.alert("Turn On Your Location and Allow the location Permission")
    }

      console.log("request return",clientResult.isSuccess,res)
      if(!res.error){
        Alert.alert('You Are Registered')
        navigation.navigate("login")
      }else{
        Alert.alert(res.error.data.message)

      }
    }else{
      console.log("Confirm password does not match")
    }
    }catch(err){
      console.log(err)
    }
    
  }

  useEffect(()=>{
    console.log(Role)
  },[])
  return (
    <SafeAreaView className="flex-1 pt-10 items-center justify-center h-full w-full bg-white">
    <ScrollView keyboardShouldPersistTaps={'always'} className="flex h-auto  ">
        <View className="flex items-center justify-center w-full">

        <View className="px-12 space-y-4">
            <Text className="text-2xl font-bold text-center">Create Account</Text>
            <Text className="text-md text-center">Create an account so you can explore all the existing jobs</Text>
        </View>
        <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{
              password:"",
              confirm_password:"",
              phone_number:"",
              email:"",
              username:"",
              first_name:"",
              last_name:"",
              address:'',
              cnic:'',
              bar_voter_number:''
            }}
            onSubmit={values=>RegisterRecord(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values,errors,isValid }) => (
        <View className="pt-10 pb-2 w-full px-2">
        <View className="gap-2 w-full">
        <TextInput
          mode="outlined"
          label="First Name"
          name="first_name"
          placeholder="Type something"
          className="w-full"
          onChangeText={handleChange('first_name')}
          onBlur={handleBlur('first_name')}
          value={values.first_name}
      // onChangeText={(text)=>HandleInput("first_name",text)}
    />
    {errors.first_name &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.first_name}</Text>
       }
    <TextInput
      mode="outlined"
      label="Last Name"
      name="last_name"
      placeholder="Type something"
      className="w-full"
      onChangeText={handleChange('last_name')}
      onBlur={handleBlur('last_name')}
      value={values.last_name}
      // onChangeText={(text)=>HandleInput("last_name",text)}
    />
    {errors.last_name &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.last_name}</Text>
       }
        <TextInput
      mode="outlined"
      label="Email"
      name="email"
      keyboardType="email-address"
      placeholder="Type something"
      className="w-full"
      onChangeText={handleChange('email')}
      onBlur={handleBlur('email')}
      value={values.email}
      // onChangeText={(text)=>HandleInput("email",text)}
    />
    {errors.email &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
       }
       <TextInput
      mode="outlined"
      label="Identity Card No."
      name="cnic"
      // keyboardType="numeric"
      placeholder="Enter Cnic"
      className="w-full"
      onChangeText={handleChange('cnic')}
      onBlur={handleBlur('cnic')}
      value={values.cnic}
      // onChangeText={(text)=>HandleInput("email",text)}
    />
    {errors.cnic &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.cnic}</Text>
       }
    <TextInput
      mode="outlined"
      label="Username"
      name="username"
      placeholder="Type something"
      className="w-full"
      onChangeText={handleChange('username')}
      onBlur={handleBlur('username')}
      value={values.username}
      // onChangeText={(text)=>HandleInput("username",text)}
    />
    {errors.username &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.username}</Text>
       }
    <TextInput
      mode="outlined"
      label="Phone Number"
      name="phone_number"
      placeholder="Type something"
      className="w-full"
      onChangeText={handleChange('phone_number')}
      // keyboardType="number-pad"
      onBlur={handleBlur('phone_number')}
      value={values.phone_number}
      // onChangeText={(text)=>HandleInput("phone_number",text)}
    />
    {errors.phone_number &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.phone_number}</Text>
       }
     {/* <TextInput
      mode="outlined"
      label="Country"
      placeholder="Type something"
      className="w-full"
      onChangeText={(text)=>HandleInput("country",text)}
    /> */}
    <TextInput
      mode="outlined"
      label="Address"
      name="address"
      placeholder="Type something"
      className="w-full"
      onChangeText={handleChange('address')}
      onBlur={handleBlur('address')}
      value={values.address}
      // onChangeText={(text)=>HandleInput("address",text)}
    />
    {errors.address &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.address}</Text>
       }
       {Role=='LAWYER' && 
       <View>
        <TextInput
            mode="outlined"
            label="Bar Voter Number"
            name="bar_voter_number"
            placeholder="Enter your bar voter number"
            className="w-full"
            onChangeText={handleChange('bar_voter_number')}
            onBlur={handleBlur('bar_voter_number')}
            value={values.bar_voter_number}
            // onChangeText={(text)=>HandleInput("address",text)}
          />
        {
          errors.bar_voter_number &&
            <Text style={{ fontSize: 10, color: 'red' }}>{errors.bar_voter_number}</Text>
          }
       </View>
       }
       {/* bar_voter_number */}
     <TextInput
       mode="outlined"
       label="Password"
       className="w-full"
      name="password"
       placeholder="Password"
      secureTextEntry={showPassword}
      right={<TextInput.Icon onPress={()=>setShowPassword(!showPassword)} icon={showPassword?"eye":'eye-off'} />}
      onChangeText={handleChange('password')}
      onBlur={handleBlur('password')}
      value={values.password}
      // onChangeText={(text)=>HandleInput("password",text)}
    />
    {errors.password &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
       }
    <TextInput
       mode="outlined"
       label="Confirm Password"
       name="confirm_password"
       placeholder="Confirm Password"
       className="w-full"
      secureTextEntry={showConfirmPassword}
      right={<TextInput.Icon onPress={()=>setShowConfirmPassword(!showConfirmPassword)} icon={showConfirmPassword?"eye":'eye-off'} />}
      onChangeText={handleChange('confirm_password')}
      onBlur={handleBlur('confirm_password')}
      value={values.confirm_password}
      // onChangeText={(text)=>HandleInput("confirm_password",text)}
    />
    {errors.confirm_password &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.confirm_password}</Text>
       }
        </View>
        <Button mode="contained" className="bg-[#FFE505] rounded font-bold py-1 mt-3" textColor='black' disabled={!isValid} onPress={handleSubmit}>
    Sign up
  </Button>
  <Pressable onPress={()=>navigation.navigate('login')}>

  <Text className="text-md font-semibold text-center py-4">Already Have an account</Text>
  </Pressable>
        </View>
            )}
            </Formik>
        {/* <View>
        <Text className="text-md font-semibold text-center pb-4">Or continue with</Text>
        <View className="flex flex-row gap-3 pb-2">
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

export default Register