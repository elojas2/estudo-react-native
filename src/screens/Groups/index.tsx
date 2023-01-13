import { useState, useCallback } from 'react'; 
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Hightlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { groupsGetAll } from '@storage/group/groupGetAll';

import { Container } from './style';

 
export function Groups() {

  const [groups, setGroups] = useState<string[]>(['Galera do Overwatch2', 'Galera do Valorant']);

  const navigation = useNavigation();
  
  function handleNewGroup(){
    navigation.navigate('new');
  }

  async function fetchGroups(){
    try {
        const data = await groupsGetAll()
        setGroups(data);
    } catch (error) {
        console.log(error);
    }
  }

  useFocusEffect(useCallback(() => {
    //console.log('usefocus usado');
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header/>

      <Hightlight 
        title="Turmas"
        subtitle='jogue com a sua turma'
      />
      
      <FlatList
        data = {groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard 
            title={item}
          />
      )}
      contentContainerStyle={groups.length === 0 && {flex: 1}}
      ListEmptyComponent={()=> 
        <ListEmpty
          message='Que tal cadastrar a primeira turma?'
        />
      }
    />

      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />

    </Container>
  );
}
