import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconArrowRight } from '../../assets/assets';
import { useNavigation } from '@react-navigation/native';

const ItemPerawatanTersedia = ({imagePerawatan, namaPerawatan, jenisTanaman, jumlahMencoba, keyData, idUser}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.containerItem}>
            <View style={styles.containerImageTitle}>
                <Image source={{uri: imagePerawatan}} style={styles.imageItem}/>   
                
                <View style={styles.containerText}>
                    <Text style={styles.titleItem}>{namaPerawatan}</Text>
                    <Text style={styles.typeItem}>{jenisTanaman}</Text>
                </View>
            </View>
            

            <View style={styles.footerContainer}>
                <Text style={styles.countTry}>{jumlahMencoba} mencoba</Text>
                <TouchableOpacity style={styles.touchArrow} onPress={() => navigation.navigate('DetailPerawatan', {keyDetailData: keyData, idUser})}>
                    <IconArrowRight/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ItemPerawatanTersedia;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    containerItem: {
        width: '100%',
        paddingTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginBottom: 18
    },
    containerImageTitle: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 10
    },
    imageItem: {
        width: windowWidth*0.18,
        height: windowHeight*0.09,
        borderRadius: 100,
        marginRight: 13
    },
    containerText: {
        justifyContent: 'center'
    },
    titleItem: {
        width: 207,
        color: '#2F3542',
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
    },
    typeItem: {
        color: '#2F3542',
        opacity: 0.5,
        fontFamily: 'Poppins-Regular',
        fontSize: 10.5,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    countTry: {
        color: '#2F3542',
        fontFamily: 'Poppins-Regular',
        opacity: 0.5,
        fontSize: 10.5,
        marginRight: 10
    },
    touchArrow: {
        backgroundColor: '#5AA469',
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10
    }

})
