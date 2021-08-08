import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { HeaderRiwayat, ItemRiwayatPerawatan, NoDataRencana } from '../../components/components';
import firestore from '@react-native-firebase/firestore';

export default class RiwayatMenanam extends Component {
    _isMounted = false;
    
    constructor(props){
        super(props);

        this.state = {
            idUser: this.props.route.params.idUser,
            keyPerawatan: [],
            valuePerawatan: [],
            dataRiwayatPerawatan: [],
            haveListPerawatan: '',
        }
    }

    componentDidMount(){
        this._isMounted = true;
        this.showRiwayatPerawatan();
    }

    showRiwayatPerawatan = async () => {
        try{
            const {idUser} = this.state;

            await firestore()
            .collection('data_riwayat_perawatan')
            .doc(idUser)
            .get()
            .then(snapshot => {
                if(snapshot.data()){
                    this.setState({
                        keyPerawatan : Object.keys(snapshot.data()),
                        valuePerawatan : Object.values(snapshot.data()),
                        haveListPerawatan: true
                    });

                    const {keyPerawatan} = this.state;

                    if(keyPerawatan.length == 0){
                        this.setState({
                            haveListPerawatan: false
                        });
                    }else{
                        this.allDataPerawatan();
                    }
                }else{
                    this.setState({
                        haveListPerawatan: false
                    });
                }
            });
        }catch(e){
            console.log(e);
        }
    }

    allDataPerawatan = async () => {
        try{
            const {valuePerawatan} = this.state;

            await firestore()
            .collection('data_perawatan')
            .get()
            .then(snapshot => {
                let dataPerawatan = [];

                snapshot.forEach(documentSnapShot => {
                    dataPerawatan.push(documentSnapShot.data());
                });

                let dataRiwayatPerawatan = [];

                dataPerawatan.forEach(itemData => {
                    for(let i = 0; i <= dataPerawatan.length; i++){
                        if(itemData.id_perawatan == valuePerawatan[i]){
                            dataRiwayatPerawatan.push(itemData);
                        }
                    }
                });

                this.setState({
                    dataRiwayatPerawatan
                });
            })
        }catch(e){
            console.log(e);
        }
    }

    render() {
        const {haveListPerawatan, dataRiwayatPerawatan, idUser} = this.state;

        return (
            <View style={styles.containerRiwayat}>
                <HeaderRiwayat namePage='Riwayat Merawat'/>

                <View style={styles.containerContent}>
                    {
                        haveListPerawatan == true ?
                            <ScrollView style={{marginTop: 40}}>
                                <Text style={styles.containerText}>dibawah ini adalah daftar merawat yang sudah anda lakukan</Text>

                                <View style={{marginHorizontal: 16}}>
                                    {
                                        dataRiwayatPerawatan.map((itemData, key) => {
                                            return(
                                                <ItemRiwayatPerawatan
                                                    imagePerawatan={itemData.image_display}
                                                    namePerawatan={itemData.nama_perawatan}
                                                    typePlant={itemData.jenis_tanaman}
                                                    idPerawatan={itemData.id_perawatan}
                                                    idUser={idUser}
                                                    key={key}
                                                />
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                        :
                            <View style={styles.containerNoData}>
                                <NoDataRencana titlePage="riwayat"/>
                            </View>
                    }
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
    },
    containerText: {
        color: '#2F3542',
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        marginHorizontal: 16,
        marginBottom: 20,
    },
    containerNoData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
