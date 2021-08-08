import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ImageBackground, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconSave } from '../../assets/assets';
import { ItemTanamanTersedia } from '../../components/components';
import firestore from '@react-native-firebase/firestore';

export default class Menanam extends Component {
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            idUser: this.props.route.params.keyUserLogin,
            dataMenanam: [],
            dataMenanamPermanent: [],
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
            titleCategory = 'Tanaman Tersedia';
        }else if(titleCategory == 'Semua'){
            titleCategory = 'Semua Tanaman';
        }else if(titleCategory == 'Pemula'){
            titleCategory = 'Menanam untuk Pemula';
        }else if(titleCategory == 'Indoor'){
            titleCategory = 'Tanaman Indoor';
        }else if(titleCategory == 'Outdoor'){
            titleCategory = 'Tanaman Outdoor';
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
            .collection('data_menanam')
            .get()
            .then(snapshot => {
                
                let dataMenanam = [];
                let dataMenanamPermanent = [];
                
                snapshot.forEach(documentSnapShot => {
                    dataMenanam.push(documentSnapShot.data());
                    dataMenanamPermanent.push(documentSnapShot.data());
                });

                this.setState({
                    dataMenanam,
                    dataMenanamPermanent
                });
            });
        }catch(e){
            console.log(e);
        }
    }

    searchData = async (value) => {
        try{
            const {dataMenanamPermanent} = this.state;

            if(value !== ''){
                let resultSearchData = [];

                dataMenanamPermanent.forEach(data => {
                    if(data.nama_tanaman.toLowerCase().includes(value.toLowerCase()) || data.jenis_tanaman.toLowerCase().includes(value.toLowerCase())){
                        resultSearchData.push(data);
                    } 
                });

                this.setState({
                    dataMenanam: resultSearchData
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
            const {dataMenanamPermanent} = this.state;

            let dataResult = [];
            let jenisPencarian = '';
            let valuePencarian = '';

            if(titleCategory == 'Semua'){
                this.changeTitleContent(titleCategory);
                return this.showData();
            }else if(titleCategory == 'Pemula'){
                jenisPencarian = 'tingkat';
                valuePencarian = 'mudah';
            }else if(titleCategory == 'Indoor'){
                jenisPencarian = 'lokasi';
                valuePencarian = 'indoor';
            }else if(titleCategory == 'Outdoor'){
                jenisPencarian = 'lokasi';
                valuePencarian = 'outdoor';
            }

            dataMenanamPermanent.forEach(data => {
                if(jenisPencarian == 'lokasi'){
                    if(data[jenisPencarian] == valuePencarian || data[jenisPencarian] == 'indoor/outdoor'){
                        dataResult.push(data);
                    }
                }else{
                    if(data[jenisPencarian] == valuePencarian){
                        dataResult.push(data);
                    }
                }
            });
            
            this.setState({
                dataMenanam: dataResult,
                titleCategory
            });

            this.changeTitleContent(titleCategory);
        }catch(e){
            console.log(e);
        }
    }
    

    render() {
        const AllTitleCategory = ['Semua', 'Pemula', 'Indoor', 'Outdoor'];
        const {dataMenanam, titleCategory, idUser} = this.state;

        return (
            <View style={{backgroundColor: '#5AA469'}}>
                <ScrollView style={styles.containerScroll}>
                    <View style={{backgroundColor: 'white'}}>
                        <View style={styles.backgroundHeader}>
                            <View style={styles.rowIconSave}>
                                <TouchableOpacity style={styles.touchSave} onPress={() => this.props.navigation.navigate('SimpananMenanam', {idUserLogin: idUser})}>
                                    <IconSave/>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <Text style={styles.headerTitle1}>Menanam</Text>
                                <Text style={styles.headerTitle2}>Tanaman Apa?</Text>
                            </View>

                            <View style={styles.containerSearch}>
                                <TextInput 
                                    style={styles.formSearch} 
                                    placeholder="nama/jenis tanaman"
                                    onChangeText={ (text) => {
                                        this.onChangeText(text);
                                    }}
                                    value={this.state.valueTextInput}
                                    autoCapitalize='words'
                                />
                            </View>

                            <View style={styles.category}>
                                {
                                    AllTitleCategory.map((titleCategory, index) => {
                                        return(
                                            <TouchableOpacity key={index} onPress={() => this.searchDataCategory(titleCategory)}>
                                                <Text style={styles.categoryText}>{titleCategory}</Text>
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
                        <Text style={styles.countItem}>{dataMenanam.length}</Text>
                        <Text style={styles.titleContent}>{titleCategory}</Text>

                        <View style={styles.containerList}>
                            {
                                dataMenanam.map((itemData, key) => {
                                    return(   
                                        <ItemTanamanTersedia 
                                            key={key}
                                            imageTanaman={itemData.image_display}
                                            jenisTanaman={itemData.jenis_tanaman}
                                            namaTanaman={itemData.nama_tanaman}
                                            jumlahMencoba={itemData.jumlah_mencoba}
                                            keyData={itemData.id_menanam}
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
    touchSave: {
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
    categoryText: {
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
    titleContent: {
        color: '#2F3542',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        marginTop: -windowHeight*0.01,
        marginBottom: 15
    },
    containerList: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
        paddingBottom: 18
    }
});

