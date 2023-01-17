import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playerGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(playerName:string, group: string){

    try {
        const storage = await playerGetByGroup(group);

        //todo mundo menos o que quero remover
        const filtered = storage.filter(player=>player.name !== playerName);
        //passar esse objeto pra string
        const players = JSON.stringify(filtered);

        //remove
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);

    } catch (error) {
        throw error;
    }
}