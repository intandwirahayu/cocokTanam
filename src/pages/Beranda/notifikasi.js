import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { HeaderRiwayat } from '../../components/components'

export default class Notifikasi extends Component {
    render() {
        return (
            <View style={styles.containerRiwayat}>
                <HeaderRiwayat namePage="Notifikasi"/>
                
                <View style={styles.containerContent}>
                    <ScrollView style={styles.containerScroll}>
                        <View style={styles.containerItem}>
                            <Text style={styles.titleHeader}>Hai pengguna akun cocokTanam!</Text>

                            <Text style={styles.titleDesc}>Pada aplikasi ini anda dapat membuat rencana menanam 
                                dan merawat tanaman yang pilih. </Text>

                            <Text style={styles.titleDesc}>Anda juga dapat membuat simpanan menanam dan merawat tanaman 
                                jika belum ingin menjadikannya sebagai rencana.</Text>

                            <Text style={styles.titleDesc}>Kemudian juga anda dapat melakukan perubahan data rencana, data 
                                simpanan, dan data akun.</Text>

                            <Text style={styles.titleDesc}>Yuk segera buat rencana menanam dan merawat tanaman agar bumi semakin
                            sehat! #hijaukanbumi #mariberkebun</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerRiwayat: {
        flex: 1,
        backgroundColor: '#5AA469'
    },
    containerContent: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop: 40
    },
    containerScroll: {
        paddingHorizontal: 20
    },
    containerItem: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 8,
        borderRadius: 30,
        backgroundColor: '#F8F8F8'
    },
    titleHeader: {
        color: '#2F3542',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 17,
        marginBottom: 18
    },
    titleDesc: {
        color: '#2F3542',
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        marginBottom: 15,
        textAlign: 'justify',
        lineHeight: 22
    }
})
