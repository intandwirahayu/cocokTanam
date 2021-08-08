import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import { IconCancel } from '../../assets/assets';
import { useNavigation } from '@react-navigation/native';

const ItemListPerawatan = ({imageMerawat, nameMerawat, typeMerawat, idMerawat, idUser, actionCancel}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.containerItemList}>
            <View style={styles.containerTouchCancel}>
                <TouchableOpacity style={styles.touchCancel} onPress={() => actionCancel(idMerawat)}>
                    <IconCancel/>
                </TouchableOpacity>
            </View>

            <View style={styles.containerContentList}>
                <Image source={{uri: imageMerawat}} style={styles.imageList}/>

                <View style={styles.containerNameList}>
                    <Text style={styles.typeItem}>{nameMerawat}</Text>
                    <Text style={styles.nameItem}>{typeMerawat}</Text>
                </View>
            </View>

            <View style={styles.containerTouchStart}>
                <TouchableOpacity style={styles.touchStart} onPress={() => navigation.navigate('RunDetailPerawatan', {keyData: idMerawat, idUser})}>
                    <Text style={styles.labelTouch}>Ayo Mulai</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default ItemListPerawatan;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    containerItemList: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'white',
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
    },
    containerContentList: {
        flexDirection: 'row',
        paddingHorizontal: 15,
    },
    imageList: {
        width: windowWidth*0.17,
        height: windowHeight*0.082,
        borderRadius: 50,
        marginRight: 15
    },
    containerNameList: {
        width: '76.2%',
        justifyContent: 'center'
    },
    typeItem: {
        color: '#2F3542',
        fontFamily: 'Poppins-Medium',
        fontSize: 13
    },
    nameItem: {
        color: '#2F3542',
        fontFamily: 'Poppins-Regular',
        fontSize: 11.5,
        opacity: 0.5
    },
    containerTouchStart: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    touchStart: {
        backgroundColor: '#5AA469',
        paddingVertical: 7,
        paddingHorizontal: 18,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    labelTouch: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
    }
});
