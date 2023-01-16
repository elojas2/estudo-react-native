import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError';

import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { playerGetByGroup } from './playersGetByGroup';
import { PLayerStorageDTO } from './PlayerStorageDTO';


export async function playerAddByGroups(newPlayer: PLayerStorageDTO, group: string){
    try {
        const storedPlayers = await playerGetByGroup(group);

        const playerAlredyExists = storedPlayers.filter(player => player.name === newPlayer.name);

        if(playerAlredyExists.length > 0){
            throw new AppError('Essa pessoa já está adicionada em um time aqui.');
        }

        const storage = JSON.stringify([...storedPlayers, newPlayer]);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
    } catch (error) {
        throw error;
    }
}