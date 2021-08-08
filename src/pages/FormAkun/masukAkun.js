import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {  IconLogo, Logo  } from '../../assets/assets';
import { ItemFormText } from '../../components/components';
import firestore from '@react-native-firebase/firestore';

export default class MasukAkun extends Component {
    constructor(props){
        super(props);

        this.state = {
            namaAkun: '',
            kataSandi: '',
            noticeNamaAkun: '',
            noticeSandi: ''
        }
    }

    onChangeText = (nameState, value) => {
        this.setState({
            [nameState] : value
        });

        this.verifData(value);
    }

    verifData = (value) => {
        if(value == ''){
            this.setState({
                noticeNamaAkun: '',
                noticeSandi: ''
            });
        }
    }

    onSubmit = async () => {
        try{
            const {kataSandi, namaAkun} = this.state;

            await firestore()
            .collection('data_pengguna')
            .where('nama_akun', '==', namaAkun)
            .get()
            .then(snapShot => {
                let kataSandiValid = '';
                let idPengguna = '';

                snapShot.forEach(documentSnapShot => {
                    kataSandiValid = documentSnapShot.data().kata_sandi;
                    idPengguna = documentSnapShot.id;
                });

                if(snapShot.size == 1){

                    this.setState({
                        noticeNamaAkun: '',
                    });

                    if(kataSandiValid == kataSandi){
                        this.setState({                    
                            namaAkun: '',
                            kataSandi: '',
                            noticeSandi: ''
                        });
 
                        Alert.alert('Berhasil', 'Selamat anda berhasil masuk akun');
                        this.props.navigation.navigate('MainApp', {keyUser: idPengguna});
                    }else{
                        this.setState({                    
                            noticeSandi: 'Kata sandi salah'
                        });
                    }
                }else{
                    
                    this.setState({
                        noticeNamaAkun: 'Nama akun tidak ditemukan',
                    });
                }
            })
        }catch(e){
            console.log(e);
        }
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: '#5AA469'}} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}> 
                <View style={{alignItems: 'center'}}>
                    <IconLogo/>

                    <View style={styles.containerForm}>
                        <ItemFormText 
                            label='nama akun' 
                            autoCapitalize='none' 
                            nameState='namaAkun' 
                            value={this.state.namaAkun} 
                            onChangeText={this.onChangeText}
                            notice={this.state.noticeNamaAkun}
                        />

                        <ItemFormText 
                            label='kata sandi' 
                            autoCapitalize='none' 
                            nameState='kataSandi' 
                            value={this.state.kataSandi} 
                            onChangeText={this.onChangeText}
                            notice={this.state.noticeSandi}
                        />
                        
                        <TouchableOpacity style={styles.touchSignIn} onPress={() => this.onSubmit()}>
                            <Text style={styles.touchLabel}>Masuk Akun</Text>
                        </TouchableOpacity>
                        
                        <View style={styles.containerTextBottom}>
                            <Text style={styles.bottomText}>belum memiliki akun? </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DaftarAkun')}>
                                <Text style={styles.signUpLink}>daftar akun</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    containerForm: {
        marginTop: 45
    },
    containerItemForm: {
        marginBottom: 30
    },
    nameForm: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Poppins-Light',
        marginLeft: 20,
        marginBottom: 6
    },
    formInput: {
        width: 300,
        borderRadius: 50,
        paddingHorizontal: 21,
        paddingVertical: 7,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        color: 'white',
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
    },
    containerInputPassword: {
        flexDirection: 'row',
        width: 300,
        borderRadius: 50,
        paddingHorizontal: 21,
        paddingVertical: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    inputPassword: {
        width: '90%',
        paddingVertical: 2,
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: 12.5,
    },
    touchIconPassword: {
        width: '13%',
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchSignIn: {
        width: 300,
        padding: 9.6,
        borderRadius: 50,
        backgroundColor: '#FDB827',
        marginTop: 20
    },
    touchLabel: {
        color: '#2F3542',
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        textAlign: 'center'
    },
    containerTextBottom: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    bottomText: {
        color: 'white',
        fontSize: 11.2,
        fontFamily: 'Poppins-Light'
    },
    signUpLink: {
        color: 'white',
        fontSize: 11.2,
        fontFamily: 'Poppins-Regular',
        textDecorationLine: 'underline'
    }
});

