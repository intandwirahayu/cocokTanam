import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ItemRiwayatMenanam = ({imagePlant, namePlant, typePlant, idPlant, idUser}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.containerItem}>
            <Image source={{uri: imagePlant}} style={styles.imageItem}/>

            <TouchableOpacity style={styles.containerText} onPress={() => navigation.navigate('DetailMenanam', {keyDetailData: idPlant, idUser})}>
                <Text style={styles.titleItem}>{namePlant}</Text>
                <Text style={styles.typeItem}>{typePlant}</Text>
            </TouchableOpacity>

            {/* <View style={styles.containerCount}>
                <Text style={styles.countText}>2x</Text>
            </View> */}
        </View>
    )
}

export default ItemRiwayatMenanam;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    containerItem: {
        width: '100%',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    imageItem: {
        width: windowWidth*0.14,
        height: windowHeight*0.07,
        borderRadius: 50
    },
    containerText: {
        width: 200,
        justifyContent: 'center',
        marginHorizontal: 10,
        paddingTop: 8.5
    },
    titleItem: {
        color: '#2F3542',
        fontSize: 12.5,
        fontFamily: 'Poppins-Medium'
    },
    typeItem: {
        color: '#2F3542',
        fontSize: 11,
        fontFamily: 'Poppins-Regular',
        opacity: 0.5,
        marginTop: -windowHeight*0.005
    },
    containerCount: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    countText: {
        color: '#5AA469',
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
    }
});
