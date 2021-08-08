import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import {  IconLogo, Logo } from '../../assets/assets';
import { ItemFormText } from '../../components/components';
import firestore from '@react-native-firebase/firestore';

export default class DaftarAkun extends Component {
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            namaLengkap: '',
            namaAkun: '',
            email: '',
            kataSandi: '',
            dataNamaAkun: [],
            dataEmail: [],
            noticeNamaAkun: '',
            noticeEmail: '',
            statusNamaAkun: '',
            statusEmail: '',
        }
    }

    componentDidMount(){
        this._isMounted = true;
        this.showData();
    }

    onChangeText = (nameState, value) => {
        this.setState({
            [nameState] : value
        })
        
        this.verifData(nameState, value);
    }

    showData = async () => {
        try{
            await firestore()
            .collection('data_pengguna')
            .get()
            .then(snapShot => {
                let dataNamaAkun = [];
                let dataEmail = [];

                snapShot.forEach(documentSnapShot => {
                    let dataPengguna = documentSnapShot.data();

                    dataNamaAkun.push(dataPengguna.nama_akun.toLowerCase());
                    dataEmail.push(dataPengguna.email.toLowerCase());
                });

                this.setState({
                    dataNamaAkun,
                    dataEmail
                });
            });
        }catch(e){
            console.log(e);
        }
    }

    verifData = async (nameState, value) => {
        try{
            const { dataNamaAkun, dataEmail } = this.state;
            const valueInput = value.toLowerCase();

            if(nameState == 'namaAkun'){
                if(dataNamaAkun.includes(valueInput)){
                    this.setState({
                        noticeNamaAkun: 'Nama akun sudah digunakan',
                        statusNamaAkun: false
                    })
                }else if(valueInput.includes(' ')){
                    this.setState({
                        noticeNamaAkun: 'Tidak boleh mengandung spasi',
                        statusNamaAkun: false
                    })
                }else{
                    this.setState({
                        noticeNamaAkun: '',
                        statusNamaAkun: true
                    })
                }
            }

            if(nameState == 'email'){
                if(dataEmail.includes(valueInput)){
                    this.setState({
                        noticeEmail: 'Email sudah digunakan',
                        statusEmail: false
                    })
                }else{
                    this.setState({
                        noticeEmail: '',
                        statusEmail: true
                    })
                }
            }
        }catch(e){
            console.log(e);
        }
    }

    onSubmit = async () => {
        try{
            const {namaLengkap, namaAkun, email, kataSandi, statusNamaAkun, statusEmail} = this.state;

            if(namaLengkap && namaAkun && email && kataSandi){
                if(statusNamaAkun && statusEmail){
                    await firestore()
                    .collection('data_pengguna')
                    .add({
                        nama_lengkap: namaLengkap,
                        nama_akun: namaAkun,
                        email: email, 
                        kata_sandi: kataSandi
                    })
                    .then(() => {
                        Alert.alert('Berhasil', 'Selamat anda berhasil daftar akun');
                        this.props.navigation.replace('MasukAkun');
                    })
                }else{
                    Alert.alert('Gagal', 'Perbaiki inputan terlebih dahulu');
                }  
            }else{
                Alert.alert('Gagal', 'Lengkapi terlebih dahulu inputan');
            }
        }catch(e){
            console.log(e);
        }
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: '#5AA469'}} style={{backgroundColor: '#5AA469'}} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}> 
                <View style={{alignItems: 'center'}}>
                    <IconLogo/>

                    <View style={styles.containerForm}>
                        <ItemFormText 
                            label='nama lengkap' 
                            autoCapitalize='words' 
                            nameState='namaLengkap' 
                            value={this.state.namaLengkap} 
                            onChangeText={this.onChangeText}
                        />

                        <ItemFormText 
                            label='nama akun' 
                            autoCapitalize='none' 
                            nameState='namaAkun' 
                            value={this.state.namaAkun} 
                            onChangeText={this.onChangeText}
                            notice={this.state.noticeNamaAkun}
                        />

                        <ItemFormText 
                            label='email' 
                            autoCapitalize='none' 
                            nameState='email' 
                            value={this.state.email} 
                            onChangeText={this.onChangeText}
                            notice={this.state.noticeEmail}
                        />

                        <ItemFormText 
                            label='kata sandi' 
                            autoCapitalize='none' 
                            nameState='kataSandi' 
                            value={this.state.kataSandi} 
                            onChangeText={this.onChangeText}
                        />
                        
                        <TouchableOpacity style={styles.touchSignIn} onPress={this.onSubmit}>
                            <Text style={styles.touchLabel}>Daftar Akun</Text>
                        </TouchableOpacity>
                        
                        <View style={styles.containerTextBottom}>
                            <Text style={styles.bottomText}>sudah memiliki akun? </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('MasukAkun')}>
                                <Text style={styles.signInLink}>masuk akun</Text>
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
        marginTop: 35
    },
    touchSignIn: {
        width: 300,
        padding: 9.4,
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
    signInLink: {
        color: 'white',
        fontSize: 11.2,
        fontFamily: 'Poppins-Regular',
        textDecorationLine: 'underline'
    },
});
