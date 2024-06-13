import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { Button, Divider, Menu, PaperProvider } from 'react-native-paper'
import { format, parseISO } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const Contracts = ({contracts}) => {
  const [visible, setVisible] = React.useState(true);
  const navigation= useNavigation()


  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View className=" px-2 gap-2">
     {/* <PaperProvider>
      <View
        style={{
          position:'absolute',
          zIndex:100,
          paddingTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
    </PaperProvider> */}
    <ScrollView className=" gap-2">

    {contracts.map(item=>(
      <Pressable onPress={()=>navigation.navigate('contract_detail',{item:item})} key={item.id} className="p-2 rounded-lg bg-gray-200 ">
        <View className="flex flex-col">
        <View className="flex flex-row">
        <Text className="text-lg font-bold">{item.title} </Text>
      
       
        </View>
        <Text className="text-md font-semibold">{item.description}</Text>
        </View>

        <View className="py-2">
          <Text className="text-md font-semibold">{format(new Date(item.created),'LLLL d, yyyy')}</Text>
        </View>
        <View className="py-2">
          <Text className={`${item.is_paid?(item.is_ended?'text-yellow-500':'text-green-500'):'text-yellow-600'} text-md font-bold`}>{item.is_paid?(item.is_ended?'Contract Completed':'Contract Started'):'Pending'}</Text>
        </View>
      </Pressable>
    ))}

    </ScrollView>
    </View>
  )
}

export default Contracts