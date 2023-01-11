import { useState } from 'react';
import { FlatList } from "react-native";

import { Header } from "@components/Header";
import { Hightlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { Button } from '@components/Button';


export function Player(){
    const [team, setTeam] = useState('Time A');
    const [players, setPlayer] = useState(['Elojas', 'Felippe', 'Yasmin', 'Cakito']);
    return(
        <Container>

            <Header showBackButton/>

            <Hightlight
                title='Nome da turma'
                subtitle="Adicione a galera e separe os times"
            />

            <Form>
                <Input
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                
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
            keyExtractor={item=>item}
            renderItem={({item})=>(
                <PlayerCard 
                    name ={item}
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
