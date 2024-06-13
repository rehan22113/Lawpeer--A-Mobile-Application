import { View, Text,Pressable, ScrollView, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput,Button, IconButton,MD3Colors } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { useGetSingleUserByJwtQuery, useGetSingleUserMutation, useUpdateUserRecordMutation } from '../../Redux/Api/Auth/userApi'
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
// import CountrySelectDropdown from "react-native-searchable-country-dropdown"
import { format } from 'date-fns'
import * as yup from 'yup'
import { Formik } from 'formik'


const updateValidationSchema = yup.object().shape({
  address: yup.string().required('Address is required'),
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  username: yup.string().required('Username is required'),
  phone_number: yup.string().required('Phone number is required'),
  email: yup.string().email("Invalid email format").required('Email is required'),
  experience_years: yup.number(),
  occupation: yup.string(),
  city: yup.string().required('City is required').max(30,"Maxmimum Charaters 30").min(3,"Minimum Charaters 30"),
  about: yup.string()
})

const EditProfile = ({navigation}) => {
  // const [data,setData] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);
  const Role = useSelector(state=>state.userauth.role)
  const {data:SingleUser} = useGetSingleUserByJwtQuery()

  // const [country,setCountry] = useState('')
  //====Date picker ====// 
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(SingleUser.dob));
  const [updateUser] = useUpdateUserRecordMutation()
  const id = useSelector(state=>state.userauth.id)


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  
  // const token = useSelector(state=>state.userauth.token)
  // const [userData] = useGetSingleUserMutation()

  const pickLicenseImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled && result.assets[0]) {

      setSelectedImage(result.assets[0].uri);
    }
  };


const UpdateUser=async(values)=>{

  try{
    const formData = new FormData();

    for (const key in values) {
      if (values.hasOwnProperty(key) && values[key] !== null && values[key] !== undefined && values[key] !== '') {
          formData.append(key, values[key]);
      }
  }
  if(selectedImage){

    formData.append('license_image', {
      uri: selectedImage,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
  }
  formData.append('dob',date)
  console.log("dateee====",values,formData)

        // console.log(formData)
        const response= await updateUser({data:formData,id})
        
        console.log(response)
        if(response){
          Alert.alert("Record Successfully Updated")
          setSelectedImage(null)
          navigation.navigate('profile',{edit:'Edited'})
        }

      }catch(err){
        console.log(err)
        Alert.alert("Something went wrong")
      }
    // console.log(res)
}

  // useEffect(()=>{
  //   FetchUser()
  // },[id])
  return (
    <ScrollView className="bg-white" keyboardShouldPersistTaps="always">

    <View className=" flex-1 flex items-center justify-start mt-5">
   {Role=='lawyer' &&
    <Pressable onPress={pickLicenseImage} className="flex gap-2 border flex-row justify-center items-center px-4 pb-2">
    <View>
    <Entypo name="upload" size={24} color="black" />
    </View>
    <View>
    <Text>Upload License</Text>
    </View>
    </Pressable>
   }
    <Formik
            validationSchema={updateValidationSchema}
            initialValues={{
              phone_number:SingleUser.phone_number,
              email:SingleUser.email,
              username:SingleUser.username,
              first_name:SingleUser.first_name,
              last_name:SingleUser.last_name,
              address:SingleUser.address,
              experience_years:SingleUser.experience_years,
              about:SingleUser.about,
              city:SingleUser.city,
              occupation:SingleUser.occupation
            }}
            onSubmit={values=>UpdateUser(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values,errors,isValid }) => (
    <View className="py-4 w-full px-2">
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
      disabled
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
      disabled
    />
    {errors.last_name &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.last_name}</Text>
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
    disabled
  />

  {errors.username &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.username}</Text>
    }

      
{Role=="lawyer"?(
  <View className="space-y-1">


<TextInput
   mode="outlined"
   multiline={true}
   numberOfLines={10}
   label="About"
   placeholder="About"
   name="about"
    className="w-full"
    onChangeText={handleChange('about')}
    onBlur={handleBlur('about')}
    value={values.about}
/>
{errors.about &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.about}</Text>
       }
       <TextInput
   mode="outlined"
   label="Experienced in Years"
   placeholder="experience"
    name="experience_years"
    className="w-full"
    onChangeText={handleChange('experience_years')}
    onBlur={handleBlur('experience_years')}
    defaultValue={`${values.experience_years}`}
/>
{errors.experience_years &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.experience_years}</Text>
       }
  </View>
)
:''}
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
    />
    {errors.email &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
       }
 
<TextInput
    mode="outlined"
    label="Phone No."
    name="phone_number"
    placeholder="Type something"
    className="w-full"
    onChangeText={handleChange('phone_number')}
    onBlur={handleBlur('phone_number')}
    value={values.phone_number}

/>
{errors.phone_number &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.phone_number}</Text>
       }
{show && (
        <DateTimePicker
          testID="dateTimePicker"
          display='spinner'
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <Pressable onPress={()=>setShow(true)}>
      <TextInput
        mode="outlined"
      className="w-full"
        label="Date of Birth"
        value={format(new Date(date),'LLLL d, yyyy')}
        placeholder="22/01/2024"
        editable={false}
      />
      </Pressable>

     
{/* <TextInput
   mode="outlined"
   label="Country"
   placeholder="Country"
   value={userRecord?.country}
   onChangeText={(text)=>HandleInput("country",text)}

/> */}


<TextInput
      mode="outlined"
      label="City"
      name="city"
      placeholder="City eg. Islamabad"
      className="w-full"
      onChangeText={handleChange('city')}
      onBlur={handleBlur('city')}
      value={values.city}
    />
    {errors.city &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.city}</Text>
       }
<TextInput
    mode="outlined"
    label="Address"
    placeholder="Address"
    name="address"
    className="w-full"
    onChangeText={handleChange('address')}
    onBlur={handleBlur('address')}
    value={values.address}
  />
  {errors.address &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.address}</Text>
       }

       { Role == 'client' && (

       <View>
       <TextInput
      mode="outlined"
      label="Occupation"
      name="occupation"
      placeholder="Type occupation"
      className="w-full"
      onChangeText={handleChange('occupation')}
      onBlur={handleBlur('occupation')}
      value={values.occupation}
    />
    {errors.occupation &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.occupation}</Text>
       }
       </View>)}
    </View>
    <View className="py-4">

    <Button mode="contained" className="bg-[#FFE505] rounded font-bold py-1" textColor='black' disabled={!isValid} onPress={handleSubmit}>
      Update
    </Button>
    </View>
    </View>
            )}
      </Formik>
</View>
    </ScrollView>

  )
}

export default EditProfile