import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ImageBackground, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Background3, IconSave } from '../../assets/assets';
import { ItemPerawatanTersedia } from '../../components/components';
import firestore from '@react-native-firebase/firestore';

export default class Perawatan extends Component {
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            idUser: this.props.route.params.keyUserLogin,
            dataPerawatan: [],
            dataPerawatanPermanent: [],
            valueTextInput: '',
            titleCategory: ''
        };
    }

    componentDidMount(){
        this._isMounted = true;
        this.showData();
        this.changeTitleContent('');
    }

    changeTitleContent = (titleCategory) => {
        if(titleCategory == ''){
            titleCategory = 'Perawatan Tersedia';
        }else if(titleCategory == 'Semua'){
            titleCategory = 'Semua Perawatan';
        }else if(titleCategory == 'Mudah'){
            titleCategory = 'Perawatan Termudah';
        }else if(titleCategory == 'Populer'){
            titleCategory = 'Perawatan Terpopuler';
        }else if(titleCategory == 'Terbaru'){
            titleCategory = 'Perawatan Terbaru';
        }else if(titleCategory == 'Pencarian'){
            titleCategory = 'Hasil Pencarian';
        }

        this.setState({
            titleCategory
        });
    }

    onChangeText = (value) => {
        this.setState({
            valueTextInput: value
        });

        this.searchData(value);
    }

    showData = async () => {
        try{
            await firestore()
            .collection('data_perawatan')
            .get()
            .then(snapshot => {
                let dataPerawatan = [];
                let dataPerawatanPermanent = [];

                snapshot.forEach(documentSnapShot => {
                    dataPerawatan.push(documentSnapShot.data());
                    dataPerawatanPermanent.push(documentSnapShot.data());
                });

                this.setState({
                    dataPerawatan,
                    dataPerawatanPermanent
                });

            });
        }catch(e){
            console.log(e);
        }
    }

    searchData = async (value) => {
        try{
            const {dataPerawatanPermanent} = this.state;

            if(value !== ''){
                let resultSearchData = [];

                dataPerawatanPermanent.forEach(data => {
                    if(data.nama_perawatan.toLowerCase().includes(value.toLowerCase()) || data.jenis_tanaman.toLowerCase().includes(value.toLowerCase())){
                        resultSearchData.push(data);
                    }
                });

                this.setState({
                    dataPerawatan: resultSearchData
                });

                this.changeTitleContent('Pencarian');
            }else{
                this.showData();
                this.changeTitleContent('');
            }
        }catch(e){
            console.log(e);
        }
    }

    searchDataCategory = (titleCategory) => {
        try{
            const {dataPerawatanPermanent} = this.state;

            let dataResult = [];

            if(titleCategory == 'Semua'){
                this.changeTitleContent(titleCategory);
                return this.showData();
            }else if(titleCategory == 'Mudah'){
                dataPerawatanPermanent.forEach(data => {
                    if(data.tingkat == 'mudah'){
                        dataResult.push(data);
                    }
                });
            }else if(titleCategory == 'Populer'){
                dataPerawatanPermanent.forEach(data => {
                    if(data.jumlah_mencoba > 1){
                        dataResult.push(data);
                    }
                });
            }else if(titleCategory == 'Terbaru'){
                this.showDataOrdering();
            }

            
            
            this.setState({
                dataPerawatan: dataResult
            });
            
            this.changeTitleContent(titleCategory);
        }catch(e){
            console.log(e);
        }
    }

    showDataOrdering = async () => {
        try{
            await firestore()
            .collection('data_perawatan')
            .orderBy('id_perawatan', 'desc')
            .get()
            .then(snapshot => {
                let dataPerawatan = [];
                let newDataPerawatan = [];

                snapshot.forEach(documentSnapShot => {
                    dataPerawatan.push(documentSnapShot.data());
                });

                for(let i = 0; i < 3; i++){
                    newDataPerawatan.push(dataPerawatan[i]);
                }

                this.setState({
                    dataPerawatan: newDataPerawatan
                });
            });
        }catch(e){
            console.log(e);
        }
    }

    render() {
        const AllTitleCategory = ['Semua', 'Mudah', 'Populer', 'Terbaru'];
        const {dataPerawatan, titleCategory, idUser} = this.state;

        return (
            <View style={{backgroundColor: '#5AA469'}}>
                <ScrollView style={styles.containerScroll}>
                    <View style={{backgroundColor: 'white'}}>
                        <View style={styles.backgroundHeader}>
                            <View style={styles.rowIconSave}>
                                <TouchableOpacity style={styles.touchIconSave} onPress={() => this.props.navigation.navigate('SimpananMerawat', {idUserLogin: idUser})}>
                                    <IconSave/>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <Text style={styles.headerTitle1}>Merawat</Text>
                                <Text style={styles.headerTitle2}>Tanaman Yuk!</Text>
                            </View>

                            <View style={styles.containerSearch}>
                                <TextInput 
                                    style={styles.formSearch} 
                                    placeholder="nama/jenis" 
                                    onChangeText={(text) => this.onChangeText(text)}
                                    value={this.state.valueTextInput}
                                    autoCapitalize='words'
                                />
                            </View>

                            <View style={styles.category}>
                                {
                                    AllTitleCategory.map((titleCategory, index) => {
                                        return(
                                            <TouchableOpacity key={index} onPress={() => this.searchDataCategory(titleCategory)}>
                                                <Text style={styles.categoriText1}>{titleCategory}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>

                    <View style={{backgroundColor: '#5AA469'}}>
                        <View style={styles.bottomBgHeader}/>
                    </View>

                    <View style={styles.containerContent}>
                        <Text style={styles.countItem}>{dataPerawatan.length}</Text>
                        <Text style={styles.titleContainer}>{titleCategory}</Text>

                        <View style={{paddingBottom: 20}}>
                            {
                                dataPerawatan.map((itemData, key) => {
                                    return(
                                        <ItemPerawatanTersedia
                                            key={key}
                                            imagePerawatan={itemData.image_display}
                                            namaPerawatan={itemData.nama_perawatan}
                                            jenisTanaman={itemData.jenis_tanaman}
                                            jumlahMencoba={itemData.jumlah_mencoba}
                                            keyData={itemData.id_perawatan}
                                            idUser={idUser}
                                        />
                                    )
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>    
        )
    }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    containerScroll: {
        height: '100%',
        backgroundColor: 'white', 
        borderBottomLeftRadius: 25, 
        borderBottomRightRadius: 25
    },
    backgroundHeader: {
        backgroundColor: '#5AA469',
        borderBottomLeftRadius: 25,
        paddingBottom: 11
    },
    rowIconSave: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 7.3,
        marginRight: 18
    },
    touchIconSave: {
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 5
    },
    headerTitle1: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 21,
        textAlign: 'center'
    },
    headerTitle2: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 21,
        textAlign: 'center',
        marginTop: -2
    },
    containerSearch: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    formSearch: { 
        width: 275,
        paddingVertical: 4,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 100,
        backgroundColor: 'white', 
        color: '#2F3542',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        marginTop: 9
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 58,
        marginTop: 14
    },
    categoriText1: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
    },
    bottomBgHeader: {
        width: '100%',
        height: 23,
        backgroundColor: 'white',
        borderTopRightRadius: 25
    },
    containerContent: {
        marginHorizontal: 23
    },
    countItem: {
        color: '#5AA469',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
    },
    titleContainer: {
        color: '#2F3542',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        marginTop: -windowHeight*0.01,
        marginBottom: 15
    }
});
