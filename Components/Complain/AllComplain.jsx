import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Button, Divider, Menu, PaperProvider } from 'react-native-paper'
import { format, parseISO } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const AllComplain = ({complain}) => {
  const [visible, setVisible] = React.useState(true);
  const navigation= useNavigation()


  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View className=" py-2 px-2 space-y-2">
    
    {complain?.map(item=>(
      <View key={item.id} className="p-2 rounded-lg bg-gray-200 ">
        <View className="flex flex-col">
        <View className="flex flex-row">
        <Text className="text-lg font-bold">{item.subject} </Text>
      
       
        </View>
        <Text className="text-md font-semibold">{item.description}</Text>
        </View>

        <View className="py-2">
          <Text className="text-md font-semibold">Contract id #{item.contract_id}</Text>
        </View>
        <View className="py-2">
          <Text className={`${!item.status?'text-green-500':'text-yellow-600'} text-md font-bold`}>Status: {item.status}</Text>
        </View>
        <View className="py-2">
        {item.details &&
          <Text className={`${item.details?'text-green-500':'text-yellow-600'} text-md font-bold`}>Detail: {item.details}</Text>
        }
        </View>
      </View>
    ))}

    </View>
  )
}

export default AllComplain