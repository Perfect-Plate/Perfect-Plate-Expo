import AsyncStorage from "@react-native-async-storage/async-storage";

const getPreferenceFormData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
        return JSON.parse(data);
    }
  } catch (e) {
    // error reading value
      console.log(e);
  }
};

export default getPreferenceFormData;