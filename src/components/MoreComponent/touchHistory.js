import React from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TouchHistory = ({namePage, title, countHistory, idUser}) => {
    const navigation = useNavigation();
    
    return(
        <TouchableOpacity style={styles.itemCount} onPress={()=> navigation.navigate(namePage, {idUser})}>
            <Text style={styles.itemCountTitle}>{title}</Text>
            <Text style={styles.itemCountValue}>{countHistory}</Text>
        </TouchableOpacity>
    );
};

export default TouchHistory;

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    itemCount: {
        width: '40%',
        height: 47,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    itemCountTitle: {
        color: 'white',
        fontFamily: 'Poppins-Light',
        fontSize: 11.3,
    },
    itemCountValue: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: 26,
        marginTop: -windowHeight*0.008
    },
});