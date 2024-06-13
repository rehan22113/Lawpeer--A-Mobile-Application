import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { GiftedChat,
  Bubble,
  InputToolbar,
  SystemMessage,
  Send,
  Actions,
  Composer
} from 'react-native-gifted-chat'
import InChatFileTransfer from '../../../Components/InChatFileTransfer';
// import { socket } from '../../../utils';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useGetAllMessagesMutation, useGetRoomByNameMutation } from '../../../Redux/Api/chat';
const url = process.env.EXPO_PUBLIC_API_URL
const Chat = ({navigation,route}) => {
  const {room_name,username,users} = route.params;
  const token = useSelector(state=>state.userauth.token)
  const [roomByName] = useGetRoomByNameMutation()
  const user = useSelector(state=>state.userauth.user)
  const id = useSelector(state=>state.userauth.id)
  const Role = useSelector(state=>state.userauth.role)
  const [allMessages] = useGetAllMessagesMutation()
  const [roomInfo,setRoomInfo] = useState(null)
  const [messages, setMessages] = useState([])
  const [isAttachImage, setIsAttachImage] = useState(false);
const [isAttachFile, setIsAttachFile] = useState(false);
const [imagePath, setImagePath] = useState('');
const [filePath, setFilePath] = useState('');

const socket =useMemo(()=>io.connect(url,
{
extraHeaders: {
Authorization: `Bearer ${token}`,
}
}),[]) 


// Join Room 
useEffect(() => {
  socket.emit("join",{ room_name: room_name, username: username });
  const handleJoin = (room) => {
    setRoomInfo(room)
    console.log(room, 'Room Join');
  };
  socket.on("join", handleJoin)

  return () => socket.off("join", handleJoin);
}, []);


  // Retrive all old message
  const RetriveMessages=async()=>{
    const roomId = await roomByName(room_name)
    
    const messages = await allMessages(roomId.data.id)
    let messageArray=[]
    if(messages){
      messageArray= messages.data?.map((message)=>{
          return ({
          _id: message.id,
          text: message.content,
          createdAt: new Date(message.created),
          user: {
            _id: message.sender_id,
            name: message.sender_name,
            avatar:`${process.env.EXPO_PUBLIC_API_URL}/${message.sender_profile_image}`,
          },
        })
      })
     
    }
      // socket.on('message', (message) => {
      //   // Add the received message to the messages state
      //   setMessages(previousMessages => GiftedChat.append(previousMessages, message));
      // });
    //   setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, messageArray),
    // )
      setMessages(
        messageArray.reverse()
      )
      
    }

  useEffect(() => {
    RetriveMessages()
  }, [])

  

  // const onSend = useCallback((messages=[]) => {

  //   socket.emit("send_message",{ room_name: room_name, username: username,content: messages[0].text });
  //   const handleSend = (message) => {
  //     // console.log("message by gifted", message);
  //     RetriveMessages()
  //   //   setMessages(previousMessages =>
  //   //   GiftedChat.append(previousMessages, messages),
  //   // )
  //   };
  //   socket.on("send_message", handleSend)
    
    
  // }, [RetriveMessages])

  const onSend = useCallback((messages = []) => {
    // Emit the message to the server

    socket.emit("send_message", { room_name: room_name, username: username, content: messages[0].text });
  }, [room_name, username]);

  useEffect(() => {
    const handleIncomingMessage = (message) => {
      // Add the received message to the messages state
      console.log("====message------",message)
      setMessages(previousMessages => GiftedChat.append(previousMessages, {
        _id: message.id,
        text: message.content,
        createdAt: new Date(message.created),
        user: {
          _id: message.sender_id,
          name: message.sender_name,
          avatar:`${process.env.EXPO_PUBLIC_API_URL}/${message.sender_profile_image}`,
        },
      }));
    };
    socket.on("send_message", handleIncomingMessage);
  
    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      socket.off("send_message", handleIncomingMessage);
    };
  }, []);

  const handlePickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
    
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, result.assets[0].uri),
      )
      // setImage(result.assets[0].uri);
    }
  };
  
  const _pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      let fileUri = result.assets[0].uri

alert(fileUri);

console.log(result);
if (!fileUri) {
        console.log('File URI is undefined or null');
        return;
      }
      if (fileUri.indexOf('.png') !== -1 || fileUri.indexOf('.jpg') !== -1 || fileUri.indexOf('.jpeg') !== -1) {
        console.log(fileUri)
        setImagePath(fileUri);
        setIsAttachImage(true);
      } else {
        console.log(fileUri)
        setFilePath(fileUri);
        setIsAttachFile(true);
      }
      // const result = await DocumentPicker.pick({
      //   type: [DocumentPicker.types.allFiles],
      //   copyTo: 'documentDirectory',
      //   mode: 'import',
      //   allowMultiSelection: true,
      // });
      // const fileUri = result[0].fileCopyUri;
      // if (!fileUri) {
      //   console.log('File URI is undefined or null');
      //   return;
      // }
      // if (fileUri.indexOf('.png') !== -1 || fileUri.indexOf('.jpg') !== -1) {
      //   console.log(fileUri)
      //   // setImagePath(fileUri);
      //   // setIsAttachImage(true);
      // } else {
      //   console.log(fileUri)
      //   // setFilePath(fileUri);
      //   // setIsAttachFile(true);
      // }
    } catch (err) {
      // if (DocumentPicker.isCancel(err)) {
      //   console.log('User cancelled file picker');
      // } else {
      //   console.log('DocumentPicker err => ', err);
        throw err;
      // }
    }
  };

 

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  }

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#2e64e5',
        },
      }}
      textStyle={{
        right: {
          color: '#fff',
        },
      }}
      />
    );
  };

  const renderInputToolbar = props => {
    
    return <InputToolbar {...props} />;
  };

  // const CustomInputToolbar=(props)=> {
  //     return (
  //       <InputToolbar {...props}>
  //     <Composer {...props} />
  //     {/* Your custom button */}
  //     <TouchableOpacity className="text-2xl " onPress={() => console.log('Custom button pressed')}>
  //       <Text className="w-10">Custom</Text>
  //     </TouchableOpacity>
  //   </InputToolbar>
  //     );
  // }

  const renderSend = (props) => {
    return (
      <View style={{flexDirection: 'row'}}>
      
        <Send {...props}>
          <View className="flex" >
          <MaterialCommunityIcons name="send-circle" size={38} color="black" />
          </View>
        </Send>
      </View>
    );
  };
  function renderActions(props) {
    return (
      <View className="flex flex-row px-2">
      {Role=="lawyer" &&
      <TouchableOpacity onPress={()=>navigation.navigate('newcontract',{users:users})}>
          <FontAwesome5 name="file-contract" size={24} color="black" />
      </TouchableOpacity>
      }
      <Actions
        {...props}
        options={{
          ['Send document']: _pickDocument,
          ['Send Picture']: handlePickImage,
          ['Send Video']: handlePickImage,
        }}
        icon={() => (
          <Entypo name="attachment" size={24} color="black" />
        )}
        onSend={args => console.log(args)}
      />
      </View>
    )
  }

  const renderChatFooter = useCallback(() => {
    if (imagePath) {
      return (
        <View >
          <Image source={{uri: imagePath}} style={{height: 75, width: 75}} />
          <TouchableOpacity
            onPress={() => setImagePath('')}
            // style={styles.buttonFooterChatImg}
          >
            <Text style={styles.textFooterChat}>X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (filePath) {
      return (
        <View>
          <InChatFileTransfer
            filePath={filePath}
          />
          <TouchableOpacity
            onPress={() => setFilePath('')}
            // style={styles.buttonFooterChat}
          >
            <Text >X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }, [filePath, imagePath]);

  return (
    <View className="flex-1">
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: id,
      }}
      renderBubble={renderBubble}
      // renderInputToolbar={CustomInputToolbar}
      renderSend={renderSend}
      renderActions={renderActions}
      renderFooter={renderInputToolbar}
      renderChatFooter={renderChatFooter}
      alwaysShowSend
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
    </View>
  )
}

export default Chat