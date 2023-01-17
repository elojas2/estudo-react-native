//Import react e react native
import { useState, useCallback } from 'react'; 
import { FlatList, Alert} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

//import de components
import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Hightlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { groupsGetAll } from '@storage/group/groupGetAll';

//import do style
import { Container } from './style';
import { Loading } from '@components/Loading';

 
export function Groups() {

  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>(['Galera do Overwatch2', 'Galera do Valorant']);

  const navigation = useNavigation();
  
  function handleNewGroup(){
    navigation.navigate('new');
  }

  async function fetchGroups(){
    try {
        setIsLoading(true);

        const data = await groupsGetAll();

        setGroups(data);
        
    } catch (error) {
        console.log(error);
        Alert.alert('Turmas', 'Não foi possível carregar as turmas');
    }finally{
      setIsLoading(false);
    }
  }

  function handleOpenGroup(group: string){
    navigation.navigate('player', { group });
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
      
      { 
        isLoading ? <Loading/>:
        <FlatList
          data = {groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard 
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={()=> (
          <ListEmpty
            message='Que tal cadastrar a primeira turma?'
          />
        )}
      />
      
      }

      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />

    </Container>
  );
}
