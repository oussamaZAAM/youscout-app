import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const ProfileHeader = ({user}) => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Avatar.Icon size={80} icon={"account"} />
      <Text style={styles.emailText}>{user.email}</Text>
      <View style={styles.counterContainer}>
        <View style={styles.counterItemContainer}>
            <Text style={styles.counterNumberText}>0</Text>
            <Text style={styles.counterLabelText}>Following</Text>
        </View>
        <View style={styles.counterItemContainer}>
            <Text style={styles.counterNumberText}>0</Text>
            <Text style={styles.counterLabelText}>Followers</Text>
        </View>
        <View style={styles.counterItemContainer}>
            <Text style={styles.counterNumberText}>0</Text>
            <Text style={styles.counterLabelText}>Likes</Text>
        </View>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')} style={styles.grayOutlinedButton}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        alignItems: 'center',
        paddingHorizontal: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    emailText: {
        padding: 20,
    },
    counterContainer: {
        paddingBottom: 20,
        flexDirection: 'row',
    },
    counterItemContainer: {
        flex: 1,
        alignItems: 'center',
    },
    counterNumberText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    counterLabelText: {
        color: 'gray',
        fontSize: 11,
    },
    grayOutlinedButton: {
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 40,
    }
})