import React, { useEffect, useContext } from 'react';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';
import Api from '../../Api';

import BarberLogo from '../../assets/barber.svg';

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                // validar o token
                let res = await Api.checkToken(token);

                // verifica se retornou um novo token
                if (res.token) {
                     // salvar o token no async storage
                    await AsyncStorage.setItem('token', res.token);

                    // salvar o token no dispatch
                    userDispatch({
                        type: 'setAvatar',
                        payload: {
                            avatar: res.data.avatar
                        }
                    });

                    navigation.reset({
                        routes: [{name: 'MainTab'}]
                    });                    
                } else {
                    navigation.navigate('SignIn');
                }

            } else {
                navigation.navigate('SignIn');
            }
        }
        checkToken();
    }, []);

    return(
        <Container>
            <BarberLogo width="100%" height="160" />
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>
    );
}