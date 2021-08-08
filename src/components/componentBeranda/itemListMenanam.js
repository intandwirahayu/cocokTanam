import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import { IconCancel } from '../../assets/assets.js';
import { useNavigation } from '@react-navigation/native';

const ItemListMenanam = ({imagePlant, typePlant, namePlant, idPlant, idUser, actionCancel}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.containerItemList}>
            <View style={styles.containerTouchCancel}>
                <TouchableOpacity style={styles.touchCancel} onPress={() => actionCancel(idPlant)}>
                    <IconCancel/>
                </TouchableOpacity>
            </View>

            <View style={styles.containerImageList}>
                <Image source={{uri: imagePlant}} style={styles.imageList}/>
            </View>
                    
            <Text style={styles.typeItem}>{typePlant}</Text>
            <Text style={styles.nameItem}>{namePlant}</Text>

            <TouchableOpacity style={styles.touchStart} onPress={() => navigation.navigate('RunDetailMenanam', {keyData: idPlant, idUser})}>
                <Text style={styles.labelTouch}>Ayo Mulai</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ItemListMenanam;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    containerItemList: {
        width: windowWidth*0.4,
        borderRadius: 10,
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    containerTouchCancel: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    touchCancel: {
        paddingTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 8,
    },
    containerImageList: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageList: {
        borderRadius: 100,
        width: windowWidth*0.255,
        height: windowHeight*0.13,
        marginBottom: 8
    },
    typeItem: {
        color: '#5AA469',
        fontFamily: 'Poppins-Regular',
        fontSize: 11.2,
        textAlign: 'center',
        marginTop: 2
    },
    nameItem: {
        color: '#2F3542',
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
        textAlign: 'center',
        marginTop: -windowHeight*0.004,
        marginBottom: 10
    },
    touchStart: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#5AA469',
        padding: 9,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    labelTouch: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 10.5,
    }
})
