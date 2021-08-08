import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HeaderPengaturan } from '../../components/components';
import { useNavigation } from '@react-navigation/native';

const MenuAkun = (props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.containerPage}>
            <HeaderPengaturan/>

            <View style={styles.containerContent}>
                <TouchableOpacity onPress={()=> navigation.navigate('EditAkun', {keyUserEdit: props.route.params.keyUserEdit})}>
                    <View style={styles.containerMenu}>
                        <Text style={styles.titleTouch}>Edit Data Akun</Text>
                        <Text style={styles.descTouch}>mengubah informasi akun yang terdaftar</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> navigation.navigate('HapusAkun', {keyUserEdit: props.route.params.keyUserEdit})}>
                    <View style={styles.containerMenu}>
                        <Text style={styles.titleTouch}>Hapus Akun</Text>
                        <Text style={styles.descTouch}>menghapus akun anda yang terdaftar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MenuAkun;

const styles = StyleSheet.create({
    containerPage: {
        height: '100%',
        backgroundColor: 'white',
    },
    containerContent: {
        marginHorizontal: 20,
    },
    containerMenu: {
        paddingVertical: 20,
        borderBottomWidth: 1.5,
        borderColor: 'rgba(47, 53, 66, 0.1)'
    },
    titleTouch: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 17.3,
        color: '#2F3542'
    },
    descTouch: {
        fontFamily: 'Poppins-Light',
        fontSize: 11,
        color: 'rgba(47, 53, 66, 0.5)'
    }
})
