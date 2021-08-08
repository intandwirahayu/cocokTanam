import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const HeaderContentBeranda = ({nameHeader, namePage, idUser}) => {
    const navigation = useNavigation();
    return(
        <View style={styles.headerContent}>
            <Text style={styles.headerContentTitle}>{nameHeader}</Text>
            
            {namePage !== '' ?
                <TouchableOpacity onPress={() => navigation.navigate(namePage, {keyUserLogin: idUser})}>
                    <Text style={styles.labelViewAll}>lihat semua</Text>
                </TouchableOpacity>

                :

                <View/>
            }
        </View>
    )
}

export default HeaderContentBeranda;

const styles = StyleSheet.create({
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerContentTitle: {
        color: '#2F3542',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15
    },
    labelViewAll: {
        color: '#5AA469',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
    }
});

