import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const SaveVideoScreen = (props) => {
  const navigation = useNavigation();
  console.log(props.route.params.source)
  return (
    <View>
      <Text>SavePost</Text>
      <Button title='NewVideo' onPress={()=>navigation.navigate('NewVideo')} />
    </View>
  )
}

export default SaveVideoScreen

const styles = StyleSheet.create({})