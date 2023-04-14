import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Feather, AntDesign } from "@expo/vector-icons"
import { COLORS } from '../../assets/styles';
const SaveVideoScreen = (props) => {
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  const handlePost = () => {
    // Handle Posting the video
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput 
          style={styles.inputText}
          value={description}
          placeholder='Add a description'
          maxLength={150}
          onChangeText={(text) => setDescription(text)}
          multiline
        />

        <Image 
          style={styles.mediaPreview}
          source={{uri: props.route.params.source}}
        />
      </View>
      <View style={styles.spacer}></View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Feather name='x' size={24} color='black' />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <AntDesign name='up-square-o' size={24} color='white' />
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SaveVideoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white'
  },
  spacer: {
    flex: 1
  },
  formContainer: {
    margin: 20,
    flexDirection: 'row',
  },
  inputText: {
    paddingVertical: 10,
    marginRight: 20,
    flex: 1,
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    backgroundColor: 'black',
    width: 60,
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 20,
    gap: 10
  },
  postButton: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.blue,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 4
  },
  cancelButton: {
    alignItems: 'center',
    flex: 1,
    borderColor: 'lightgrey',
    borderWidth: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 4
  },
  postButtonText: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16
  },
  cancelButtonText: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16
  },
})