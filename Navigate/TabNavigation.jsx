import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Stack/Home';
// import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Chat from '../Screens/Tabs/Chat/Chat';
import Profile from '../Screens/Tabs/Profile';
import Wallet from '../Screens/Tabs/Wallet';
import Contract from '../Screens/Stack/ContractTabs/Contract';
import { ChatScreen, ContractScreen } from './StackNavigation';


const Tab = createBottomTabNavigator();


export const ClientTabNavigation = () =>{
    return <>
       <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home';
              } else if (route.name === 'profile') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              } else if (route.name === 'Chats') {
                iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
              }else if (route.name === 'wallet') {
                iconName = focused ? 'wallet' : 'wallet-outline';
              }else if (route.name === 'Contract') {
                iconName = focused ? 'people' : 'people-outline';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#FFE505',
            tabBarInactiveTintColor: 'gray',
          })} >
        <Tab.Screen options={{headerShown:true,title:'Contracts'}} name="Contract" component={ContractScreen} />
  
        <Tab.Screen options={{headerShown:false}} name="Chats" component={ChatScreen} />
        <Tab.Screen options={{headerShown:false}} name="Home" component={Home} /> 
        <Tab.Screen options={{headerShown:false,title: 'Wallet',
        headerTitleAlign: 'center'}} name="wallet" component={Wallet} />
        <Tab.Screen options={{headerShown:true,title: 'Profile',
        headerTitleAlign: 'center'}} name="profile" component={Profile} />
      </Tab.Navigator>
    </>
  }
  
export const LawyerTabNavigation = ()=>{
    return <>
      <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home';
              } else if (route.name === 'profile') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              } else if (route.name === 'chats') {
                iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
              }else if (route.name === 'wallet') {
                iconName = focused ? 'wallet' : 'wallet-outline';
              }else if (route.name === 'contract') {
                iconName = focused ? 'people' : 'people-outline';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#FFE505',
            tabBarInactiveTintColor: 'gray',
          })} >
        <Tab.Screen options={{headerShown:true,title:'Contracts'}} name="contract" component={ContractScreen} />
  
        <Tab.Screen options={{headerShown:false}} name="chats" component={ChatScreen} />
        {/* <Tab.Screen options={{headerShown:false}} name="Home" component={Home} /> */}
        <Tab.Screen options={{headerShown:false,title: 'Wallet',
        headerTitleAlign: 'center', headerBackground:'yellow'}} name="wallet" component={Wallet} />
        <Tab.Screen options={{headerShown:true,title: 'Profile',
        headerTitleAlign: 'center'}} name="profile" component={Profile} />
      </Tab.Navigator>
    </>
  }


