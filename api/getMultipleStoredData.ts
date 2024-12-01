import AsyncStorage from "@react-native-async-storage/async-storage";

const getMultipleStoredData = async (keys: string[] ) => {
  try {
  //  loop through the keys and get the data, then return the key mapped with its data value
    const joinedData: { [x: string]: string | null; }[] = [];
    await Promise.all(keys.map(async (key) => {
      const data = await AsyncStorage.getItem(key);
        joinedData.push({[key]: data});
    }));
    return joinedData;
  } catch (e) {
      console.log(e);
  }
};

export default getMultipleStoredData;