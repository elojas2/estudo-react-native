//Imports do react native e react
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from 'react-native';

//import dos storages
import { groupCreate } from "@storage/group/groupCreate";

//import dos components
import { Header } from "@components/Header";
import { Hightlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { AppError } from "@utils/AppError";

//import do style
import { Container, Content, Icon} from "./styles";

export function NewGroup(){

    const [group, setGroup] = useState('');
    const navigation = useNavigation();

    async function handleNew(){
        try{

            if(group.trim().length === 0){
                return Alert.alert('Novo Grupo', 'Informe o nome da turma.');
            }

            await groupCreate(group);
            navigation.navigate('player',{ group });
        }
        catch(error){
            if(error instanceof AppError){
                Alert.alert('Novo Grupo', error.message);
            }else{
                Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo');
                console.log(error);
            }
        }
    }

    return(
        <Container>
            <Header showBackButton/>

            <Content>
                <Icon/>
                <Hightlight
                    title='Nova turma'
                    subtitle="Crie a turma para adicionar as pessoas"                
                />
                
               <Input
                    placeholder="Nome da turma"
                    onChangeText={setGroup}
               />

               <Button 
                    title='Criar'
                    style={{ marginTop: 20 }}
                    onPress={handleNew}
               />
            </Content>

        </Container>
    );
}