import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupGetAll";

export async function groupCreate(newGroup: string){

    try {
        const storedGrups = await groupsGetAll();

        const storage = JSON.stringify([...storedGrups, newGroup]);
        await AsyncStorage.setItem(GROUP_COLLECTION, storage);

    } catch (error) {
        throw error;
    }
    
}