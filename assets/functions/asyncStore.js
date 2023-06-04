import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeLocalData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.error(e)
  }
}

export const getLocalData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    const data = JSON.parse(value);
    if (value !== null) {
      return data;
    }
  } catch (e) {
    console.error(e)
  }
}