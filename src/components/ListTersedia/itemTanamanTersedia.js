import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconArrowRight } from '../../assets/assets';
import { useNavigation } from '@react-navigation/native';

const ItemTanamanTersedia = ({jenisTanaman, namaTanaman, imageTanaman, jumlahMencoba, keyData, idUser}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.containerItem}>
            <View style={styles.containerImage}>
                <Image source={{uri: imageTanaman}} style={styles.imageItem}/>
            </View>
            
            <Text style={styles.typeItem}>{jenisTanaman}</Text>
            <Text style={styles.nameItem}>{namaTanaman}</Text>

            <View style={styles.footerContainer}>
                <Text style={styles.countTry}>{jumlahMencoba} mencoba</Text>
                <TouchableOpacity style={styles.touchArrow} onPress={() => navigation.navigate('DetailMenanam', {keyDetailData: keyData, idUser})}>
                    <IconArrowRight/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ItemTanamanTersedia;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    containerItem: {
        width: '47%',
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
    containerImage: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 4,
        marginBottom: 5.5
    },
    imageItem: {
        width: windowWidth*0.28,
        height: windowHeight*0.14,
        borderRadius: 100
    },
    typeItem: {
        color: '#5AA469',
        fontFamily: 'Poppins-Regular',
        fontSize: 12.5,
        textAlign: 'center',
        marginTop: 5
    },
    nameItem: {
        color: '#2F3542',
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
        textAlign: 'center',
        marginTop: -windowHeight*0.002,
        marginBottom: 10
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
