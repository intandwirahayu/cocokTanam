import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { LogoSmall } from '../../assets/assets';
import { HeaderPengaturan } from '../../components/components';

export default class BantuanAkun extends Component {
    render() {
        return (
            <View>
                <HeaderPengaturan/>

                <View style={styles.containerEdit}>
                    <View>
                        <Text style={styles.textTitle}>Hubungi Kami</Text>
                        <Text style={styles.textDescTitle}>jika mengalami kendala pada saat menggunakan aplikasi, dapat menghungi kami melalui</Text>
                        <Text style={styles.textDescTitle}>email dengan alamat :</Text>

                        <Text style={styles.textEmail}>cocoktanamhelp@gmail.com</Text>
                    </View>

                    <View style={{marginTop: 20}}>
                        <Text style={styles.textTitle}>Kebijakan Aplikasi</Text>
                        <Text style={styles.textDescTitle}>aplikasi ini dibuat untuk mencapai gelar sarjana strata</Text>
                        <Text style={styles.textDescTitle}>satu (S1). jika ingin mengembangkan aplikasi ini, </Text>
                        <Text style={styles.textDescTitle}>dimohon untuk menghubungi kontak tertera :</Text>

                        <Text style={styles.textEmail}>intandwirahayu202@gmail.com</Text>

                        <Text style={styles.textDescTitle}>dilarang keras mengikuti sebagian atau seluruh alur
                            dalam sistem ini tanpa seijin pembuat aplikasi.</Text>
                    </View>

                    <View style={styles.containerPowered}>
                        <Text style={styles.titleBottom}>Powered By</Text>
                        <Image source={LogoSmall} style={styles.logoSmall}/>
                    </View>
                </View>
            </View>
        )
    }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    containerEdit: {
        paddingHorizontal: 17,
        height: '90%'
    },
    textTitle: {
        color: '#2F3542',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 22,
        marginBottom: 12.5
    },
    textDescTitle: {
        color: '#2F3542',
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        lineHeight: 22,
    },
    textEmail: {
        color: '#2F3542',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        marginVertical: 15
    },
    titleBottom: {
        color: 'rgba(47, 53, 66, 0.5)',
        fontSize: 11.5,
        fontFamily: 'Poppins-Light'
    },
    logoSmall: {
        width: windowWidth*0.275,
        height: windowHeight*0.04
    },
    containerPowered: {
        alignItems: 'center',
        marginTop: 90
    }
});
