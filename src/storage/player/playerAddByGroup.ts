import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError';

import { PLAYER_COLLECTION } from '@storage/storageConfig';

import { PLayerStorageDTO } from './PlayerStorageDTO';

export async function playerAddByGroups(newPlayer: PLayerStorageDTO, group: string){
    try {
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, '')
    } catch (error) {
        throw error;
    }
}