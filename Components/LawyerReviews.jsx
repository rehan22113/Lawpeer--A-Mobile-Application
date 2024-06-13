import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

const LawyerReviews = ({item}) => {

  return (
    <View className="flex text-gray-800 dark:text-gray-300 my-1">
                
                <Text className="text-gray-700 text-md font-semibold ">{item.review_text}</Text>
                <View className="flex flex-row gap-1">

                {item.rating>0 ? [1, 2, 3, 4, 5].map((value) => (
        <View key={value}>
    <AntDesign name="star" size={12} color={value <= item.rating ? 'gold' : 'black'} />
    </View>
      )):<Text className="">No Reviews</Text>}
                </View>
                
            </View>
  )
}

export default LawyerReviews