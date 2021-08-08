import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Text } from 'react-native';
import { NoDataRencana } from '../../components/components.js';
import { HeaderRiwayat, ItemListMenanam } from '../../components/components';
import firestore from '@react-native-firebase/firestore';

export default class RencanaMenanam extends Component {
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            idUser: this.props.route.params.keyUserLogin,
            keyMenanam: [],
            valueMenanam: [],
            dataRencanaMenanam: [],
            countDataRencana: '',
            haveListMenanam: ''
        }
    }

    componentDidMount(){
        this._isMounted = true;
        this.showRencanaMenanam();
    }

    showRencanaMenanam = async () => {
        try{
            //mencari data rencana menanam berdasarkan id user
            const {idUser} = this.state;

            await firestore()
            .collection('data_rencana_menanam')
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
            this.setState({
                haveListMenanam: false
            });
        }
    }

    allDataMenanam = async () => {
        try{
            //mencocokkan data menanam dan data rencana menanam
            const {valueMenanam} = this.state;

            await firestore()
            .collection('data_menanam')
            .get()
            .then(snapshot => {
                let dataMenanam = [];

                snapshot.forEach(documentSnapShot => {
                    dataMenanam.push(documentSnapShot.data());
                });

                let dataRencanaMenanam = [];

                dataMenanam.forEach(itemData => {
                    for(let i = 0; i <= dataMenanam.length; i++){
                        if(itemData.id_menanam == valueMenanam[i]){
                            dataRencanaMenanam.push(itemData);
                        }
                    }
                });

                this.setState({
                    dataRencanaMenanam,
                    countDataRencana: dataRencanaMenanam.length
                });
            })
        }catch(e){
            console.log(e);
        }
    }

    deleteRencanaMenanam = async (keyData) => {
        try{
            //menghapus salah satu isi data rencana menanam
            //dengan klik icon cancel
            const {keyMenanam, valueMenanam, idUser} = this.state;

            let valueDelete = valueMenanam.indexOf(keyData);
            let keyDelete = keyMenanam[valueDelete];

            await firestore()
            .collection('data_rencana_menanam')
            .doc(idUser)
            .update({
                [keyDelete] : firestore.FieldValue.delete()
            })
            .then(snapshot => {
                this.deleteDocEmpty(idUser);
            })
        }catch(e){
            console.log(e);
        }
    }

    //for delete doc menanam empty
    deleteDocEmpty = async (idUser) => {
        try{
            await firestore()
            .collection('data_rencana_menanam')
            .doc(idUser)
            .get()
            .then(snapshot => {
                let dataKey = Object.keys(snapshot.data());
                
                if(dataKey.length == 0){
                    firestore()
                    .collection('data_rencana_menanam')
                    .doc(idUser)
                    .delete()
                    .then(() => {
                        this.showRencanaMenanam();
                    })
                }else{
                    this.showRencanaMenanam();
                }
            });
        }catch(e){
            console.log(e);
        }
    }

    render(){
        const {haveListMenanam, dataRencanaMenanam, countDataRencana, idUser} = this.state;

        return (
            <View style={styles.containerSimpanan}>
                <HeaderRiwayat namePage='Rencana Menanam'/>
                    
                <View style={styles.containerContent}>
                    {
                        haveListMenanam == true ?
                            <ScrollView style={{marginTop: 40}}>
                                <View style={{marginLeft: 25}}>
                                    <Text style={styles.countItem}>{countDataRencana}</Text>
                                    <Text style={styles.titleContainer}>Rencana</Text>
                                    <Text style={styles.titleContainer}>Menanam Mu</Text>
                                </View>
                    
                                <View style={styles.containerList}>
                                    {
                                        dataRencanaMenanam.map((itemRencana, key) => {
                                            return(
                                                <ItemListMenanam
                                                    imagePlant={itemRencana.image_display}
                                                    typePlant={itemRencana.jenis_tanaman}
                                                    namePlant={itemRencana.nama_tanaman}
                                                    idPlant={itemRencana.id_menanam}
                                                    idUser={idUser}
                                                    key={key}
                                                    actionCancel={this.deleteRencanaMenanam}
                                                />
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                        :
                            <View style={styles.containerNoData}>
                                <NoDataRencana titlePage="rencana"/>
                            </View>
                    }
                </View>
            </View>
        )
    }
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    containerSimpanan: {
        flex: 1,
        backgroundColor: '#5AA469'
    },
    containerContent: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        
    },
    containerNoData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countItem: {
        color: '#5AA469',
        fontSize: 30,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: -windowHeight*0.012
    },
    titleContainer: {
        color: '#2F3542',
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold'
    },
    containerList: {
        marginHorizontal: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 15,
        marginBottom: 30
    }
});

