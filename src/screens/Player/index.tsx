import { useState, useEffect, useRef} from 'react';
import { Alert, FlatList, TextInput } from "react-native";
import { useRoute } from '@react-navigation/native';

import { Header } from "@components/Header";
import { Hightlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { Button } from '@components/Button';
import { ButtonIcon } from '@components/ButtonIcon';
import { AppError } from '@utils/AppError';
import { playerAddByGroups } from '@storage/player/playerAddByGroup';
import { playerGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { PLayerStorageDTO } from '@storage/player/PlayerStorageDTO';

type RouteParams = {
    group: string;
}

export function Player(){

    const [newPlayerName, setNewPlayerName] = useState('');
    const [team, setTeam] = useState('Time A');
    const [players, setPlayer] = useState<PLayerStorageDTO[]>([]);

    const route = useRoute();
    const { group } = route.params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null);
    async function handleAddPlayer(){
        if(newPlayerName.trim().length === 0){
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar')
        }
        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {
            await playerAddByGroups(newPlayer, group);

            newPlayerNameInputRef.current?.blur();

            setNewPlayerName('');
            fetchPlayersByTeam();
         
        } catch (error) {
            if(error instanceof AppError){
                Alert.alert('Nova pessoa', error.message)
            }else{
                console.log(error);
                Alert.alert('Nova pessoa', 'Não foi possível adicionar')
            }
        }
    }
    async function fetchPlayersByTeam(){
        try {
            const playersByTeam = await playerGetByGroupAndTeam(group, team);
            setPlayer(playersByTeam);
        } catch (error) {
            console.log(error);
            Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado')
        }
    }

    useEffect(() =>{
        fetchPlayersByTeam();
    }, [team]);

    return(
        <Container>

            <Header showBackButton/>

            <Hightlight
                title={group}
                subtitle="Adicione a galera e separe os times"
            />

            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType='done'
                />
            
                <ButtonIcon
                    icon='add'
                    onPress={handleAddPlayer}
                />
            </Form>

            <HeaderList>
                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor={item=>item}
                    renderItem={({item})=>(
                    <Filter 
                        title={item}
                        isActive={item === team}
                        onPress={() => setTeam(item)}
                    />

                    )}
                    horizontal={true}
                />
        <NumbersOfPlayers>
             {players.length}           
        </NumbersOfPlayers>
        
        </HeaderList>
        <FlatList
            data={players}
            keyExtractor={item=>item.name}
            renderItem={({item})=>(
                <PlayerCard 
                    name ={item.name}
                    onRemove={()=> {}}
                />
            )}
            ListEmptyComponent={()=> (
                <ListEmpty
                    message='Que tal cadastrar a primeira turma?'
                />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
                {paddingBottom: 100},
                players.length === 0 && {flex: 1}
            ]}
        />
                   
            <Button
                title='Remover Turma'
                type='SECONDARY'
            />
        </Container>
    );
}
