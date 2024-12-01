import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.removeItem(key);
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
      console.log(e);
  }
};

export default storeData;