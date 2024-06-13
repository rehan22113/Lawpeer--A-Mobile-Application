import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Contact = () => {
  return (
    <View className="flex flex-1 " style={styles.container}>
      <Text style={styles.title}>Share Your Queries with Us</Text>
      
      <Text style={styles.email}>Contact Email: <Text style={styles.bold}>info.lawpeer@gmail.com</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Contact;
