import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Chip } from 'react-native-paper';
import { useAddSkillMutation, useGetLawyerSkillsQuery, useGetSkillsQuery } from '../../Redux/Api/Auth/lawyerApi'


const AddSkills = () => {
  const [skills,setSkills] = useState([])
  const {data:getSkill} = useGetSkillsQuery()
  const {data:getLawyerSkill} = useGetLawyerSkillsQuery()
  const [addSkill] = useAddSkillMutation()
  const [selectSkills,setSelectSkills] = useState([])
  const FetchSkills =async()=>{
      setSkills(getSkill) 

      let arr = getLawyerSkill?.map(item=>item.id)
      // console.log("skills",getLawyerSkill,arr)
      if(arr){
        setSelectSkills(arr)
      }

  }  

  const HandleSkills = (item) =>{
    // console.log(selectSkills.some(obj=>obj[id]==item.id))
    if( !selectSkills?.some(obj=>obj==item.id)){
      if(selectSkills.length<5){
        setSelectSkills([...selectSkills,item.id])
      }else{
        Alert.alert("You can only add 5 skill only.")
      }
    }else{
      setSelectSkills(selectSkills.filter(obj=>obj!=item.id))
    }
    
  }

  const UpdateSkill=async()=>{
    const res = await addSkill(selectSkills)
    console.log("response",res)
    Alert.alert("Skills Updated Successfully")
  }

  useEffect(()=>{
      FetchSkills()
      console.log("select",selectSkills)
  },[getSkill])

  return (
    <View keyboardShouldPersistTaps='always' className="flex justify-between items-stretch h-[90vh]">

    <View className="flex flex-row flex-wrap gap-2 p-2">
    {skills && skills.map((item)=>(
      <Chip key={item.id} icon={selectSkills && selectSkills?.some(obj=>obj==item.id)?"trash-can-outline":'plus'} mode={selectSkills.some(obj=>obj==item.id)?'flat':'outlined'} onPress={()=>HandleSkills(item)}>{item.name}</Chip>
    ))}
    </View>
    <View>
    <Button mode="contained" className="bg-[#FFE505] rounded font-bold text-xl mx-2" textColor='black' onPress={UpdateSkill}>
   <Text className="text-lg"> Update skill</Text> 
  </Button>
    </View>
    </View>
  )
}

export default AddSkills