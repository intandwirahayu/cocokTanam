import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { HeaderRiwayat, ItemRiwayatMenanam, NoDataRencana } from '../../components/components';
import firestore from '@react-native-firebase/firestore';

export default class RiwayatMenanam extends Component {
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            idUser: this.props.route.params.idUser,
            keyMenanam: [],
            valueMenanam: [],
            dataRiwayatMenanam: [],
            haveListMenanam: '',
        }
    }

    componentDidMount(){
        this._isMounted = true;
        this.showRiwayatMenanam();
    }

    showRiwayatMenanam = async () => {
        try{
            const {idUser} = this.state;

            await firestore()
            .collection('data_riwayat_menanam')
            .doc(idUser)
            .get()
            .then(snapshot => {
                if(snapshot.data()){
                    this.setState({
                        keyMenanam : Object.keys(snapshot.data()),
                        valueMenanam : Object.values(snapshot.data()),
                        haveListMenanam: true
                    });

                    const {keyMenanam} = this.state;

                    if(keyMenanam.length == 0){
                        this.setState({
                            haveListMenanam: false
                        });
                    }else{
                        this.allDataMenanam();
                    }
                }else{
                    this.setState({
                        haveListMenanam: false
                    });
                }
            });
        }catch(e){
            console.log(e);
        }
    }

    allDataMenanam = async () => {
        try{
            const {valueMenanam} = this.state;

            await firestore()
            .collection('data_menanam')
            .get()
            .then(snapshot => {
                let dataMenanam = [];

                snapshot.forEach(documentSnapShot => {
                    dataMenanam.push(documentSnapShot.data());
                });

                let dataRiwayatMenanam = [];

                dataMenanam.forEach(itemData => {
                    for(let i = 0; i <= dataMenanam.length; i++){
                        if(itemData.id_menanam == valueMenanam[i]){
                            dataRiwayatMenanam.push(itemData);
                        }
                    }
                });

                this.setState({
                    dataRiwayatMenanam
                });
            })
        }catch(e){
            console.log(e);
        }
    }

    render() {
        const {haveListMenanam, dataRiwayatMenanam, idUser} = this.state;

        return (
            <View style={styles.containerRiwayat}>
                <HeaderRiwayat namePage='Riwayat Menanam'/>

                <View style={styles.containerContent}>
                    {
                        haveListMenanam == true ? 
                            <ScrollView style={{marginTop: 40}}>
                                <Text style={styles.containerText}>dibawah ini adalah daftar menanam yang sudah anda lakukan</Text>

                                <View style={{marginHorizontal: 16}}>
                                    {
                                        dataRiwayatMenanam.map((itemData, key) => {
                                            return(
                                                <ItemRiwayatMenanam
                                                    imagePlant={itemData.image_display}
                                                    namePlant={itemData.nama_tanaman}
                                                    typePlant={itemData.jenis_tanaman}
                                                    idPlant={itemData.id_menanam}
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
