import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconCorrect, IconWrong } from '../../assets/assets';
import { HeaderQuiz } from '../../components/components'
import firestore from '@react-native-firebase/firestore';

class QuizPerawatan extends Component {
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            keyData: this.props.route.params.keyData,
            idUser: this.props.route.params.idUser,
            borderColor0: 'white',
            borderColor1: 'white',
            borderColor2: 'white',
            backgroundColor0: 'rgba(47, 53, 66, 0.06)',
            backgroundColor1: 'rgba(47, 53, 66, 0.06)',
            backgroundColor2: 'rgba(47, 53, 66, 0.06)',
            resultAnswer: 'none',
            pertanyaan: '',
            chooseAnswer: '',
            trueAnswer: '',
            itemPilihanJawaban: [],
            labelButtonBottom: 'Cek Jawaban',
            numQuiz: '1',
            valueDisabled: false,
            keyPerawatan: [],
            valuePerawatan: [],
            dataRencanaPerawatan: [],
        }
    }

    componentDidMount(){
        this._isMounted = true;
        this.showFieldPertanyaan();
        this.showFieldJawaban();
        this.showRencanaPerawatan();
    }

    showFieldPertanyaan = async () => {
        try{
            const {keyData, numQuiz} = this.state;

            await firestore()
            .collection('data_kuis_perawatan')
            .doc(keyData)
            .collection('item_pertanyaan')
            .doc(numQuiz)
            .get()
            .then(snapshoot => {
                this.setState({
                    pertanyaan: snapshoot.data().soal
                });
            })
        }catch(e){
            console.log(e);
        }
    }

    showFieldJawaban = async () => {
        try{
            const {keyData, numQuiz} = this.state;

            await firestore()
            .collection('data_kuis_perawatan')
            .doc(keyData)
            .collection('item_pertanyaan')
            .doc(numQuiz)
            .collection('pilihan_jawaban')
            .doc('item_jawaban')
            .get()
            .then(snapshoot => {
                let itemPilihanJawaban = Object.values(snapshoot.data());

                this.setState({
                    itemPilihanJawaban
                });
            })
        }catch(e){
            console.log(e);
        }
    }

    checkAnswer = async () => {
        try{
            const {keyData, chooseAnswer, labelButtonBottom, resultAnswer, numQuiz} = this.state;

            if(resultAnswer == 'none'){
                this.setState({
                    valueDisabled: true
                });
            }

            if(labelButtonBottom == 'Cek Jawaban'){
                firestore()
                .collection('data_kuis_perawatan')
                .doc(keyData)
                .collection('item_pertanyaan')
                .doc(numQuiz)
                .get()
                .then(snapshoot => {
                    let jawabanBenar = snapshoot.data().jawaban_benar;

                    if(jawabanBenar == chooseAnswer){
                        if(numQuiz == '3'){
                            this.setState({
                                resultAnswer: true,
                                trueAnswer: chooseAnswer, 
                                labelButtonBottom: 'Selesai'
                            });
                        }else{
                            this.setState({
                                resultAnswer: true,
                                trueAnswer: chooseAnswer, 
                                labelButtonBottom: 'Lanjut'
                            });
                        }
                    }else{
                        this.setState({
                            resultAnswer: false,
                            trueAnswer: chooseAnswer,
                            labelButtonBottom: 'Ulang'
                        });
                    }

                    this.finalTouch();
                })
            }else if(labelButtonBottom == 'Lanjut'){
                this.nextQuestion();
            }else if(labelButtonBottom == 'Ulang'){
                this.setState({
                    borderColor0: 'white',
                    borderColor1: 'white',
                    borderColor2: 'white',
                    backgroundColor0: 'rgba(47, 53, 66, 0.06)',
                    backgroundColor1: 'rgba(47, 53, 66, 0.06)',
                    backgroundColor2: 'rgba(47, 53, 66, 0.06)',
                    resultAnswer: 'none',
                    labelButtonBottom: 'Cek Jawaban',
                    valueDisabled: false
                })
            }else if(labelButtonBottom == 'Selesai'){
                //finish
                this.checkRiwayatPerawatan();
            }
        }catch(e){
            console.log(e);
        }
    }

    nextQuestion = () => {
        this.setState({
            keyData:  this.props.route.params.keyData,
            borderColor0: 'white',
            borderColor1: 'white',
            borderColor2: 'white',
            backgroundColor0: 'rgba(47, 53, 66, 0.06)',
            backgroundColor1: 'rgba(47, 53, 66, 0.06)',
            backgroundColor2: 'rgba(47, 53, 66, 0.06)',
            resultAnswer: 'none',
            chooseAnswer: '',
            pertanyaan: '',
            trueAnswer: '',
            itemPilihanJawaban: [],
            labelButtonBottom: 'Cek Jawaban',
            valueDisabled: false
        });

        const {numQuiz} = this.state;
        let newNumQuiz;

        if(numQuiz == '1'){
            this.setState({
                numQuiz: '2'
            });

            newNumQuiz = '2';

        }else if(numQuiz == '2'){
            this.setState({
                numQuiz: '3'
            });

            newNumQuiz = '3';
        }

        this.nextFieldPertanyaan(newNumQuiz);
        this.nextFieldJawaban(newNumQuiz);
    }

    nextFieldPertanyaan = async (newNumQuiz) => {
        try{
            const {keyData} = this.state;

            await firestore()
            .collection('data_kuis_perawatan')
            .doc(keyData)
            .collection('item_pertanyaan')
            .doc(newNumQuiz)
            .get()
            .then(snapshoot => {
                this.setState({
                    pertanyaan: snapshoot.data().soal,
                    numQuiz: newNumQuiz
                });
            })
        }catch(e){
            console.log(e);
        }
    }

    nextFieldJawaban = async (newNumQuiz) => {
        try{
            const {keyData} = this.state;

            await firestore()
            .collection('data_kuis_perawatan')
            .doc(keyData)
            .collection('item_pertanyaan')
            .doc(newNumQuiz)
            .collection('pilihan_jawaban')
            .doc('item_jawaban')
            .get()
            .then(snapshoot => {
                let itemPilihanJawaban = Object.values(snapshoot.data());

                this.setState({
                    itemPilihanJawaban,
                    numQuiz: newNumQuiz
                });
            })
        }catch(e){
            console.log(e);
        }
    }

    finalTouch = () => {
        const {resultAnswer, chooseAnswer} = this.state;

        if(resultAnswer == true){
            if(chooseAnswer == '0'){
                this.setState({
                    borderColor0: '#5AA469',
                    borderColor1: 'white',
                    borderColor2: 'white',
                    backgroundColor0: 'rgba(46, 213, 115, 0.2)',
                    backgroundColor1: 'rgba(47, 53, 66, 0.06)',
                    backgroundColor2: 'rgba(47, 53, 66, 0.06)',
                });
            }else if(chooseAnswer == '1'){
                this.setState({
                    borderColor0: 'white',
                    borderColor1: '#5AA469',
                    borderColor2: 'white',
                    backgroundColor0: 'rgba(47, 53, 66, 0.06)',
                    backgroundColor1: 'rgba(46, 213, 115, 0.2)',
                    backgroundColor2: 'rgba(47, 53, 66, 0.06)',
                });
            }else if(chooseAnswer == '2'){
                this.setState({
                    borderColor0: 'white',
                    borderColor1: 'white',
                    borderColor2: '#5AA469',
                    backgroundColor0: 'rgba(47, 53, 66, 0.06)',
                    backgroundColor1: 'rgba(47, 53, 66, 0.06)',
                    backgroundColor2: 'rgba(46, 213, 115, 0.2)',
                });
            }
        }else{
            if(chooseAnswer == '0'){
                this.setState({
                    borderColor0: '#F64E4E',
                    borderColor1: 'white',
                    borderColor2: 'white',
                    backgroundColor0: 'rgba(246, 78, 78, 0.2)',
                    backgroundColor1: 'rgba(47, 53, 66, 0.06)',
                    backgroundColor2: 'rgba(47, 53, 66, 0.06)',
                });
            }else if(chooseAnswer == '1'){
                this.setState({
                    borderColor0: 'white',
                    borderColor1: '#F64E4E',
                    borderColor2: 'white',
                    backgroundColor0: 'rgba(47, 53, 66, 0.06)',
                    backgroundColor1: 'rgba(246, 78, 78, 0.2)',
                    backgroundColor2: 'rgba(47, 53, 66, 0.06)',
                });
            }else if(chooseAnswer == '2'){
                this.setState({
                    borderColor0: 'white',
                    borderColor1: 'white',
                    borderColor2: '#F64E4E',
                    backgroundColor0: 'rgba(47, 53, 66, 0.06)',
                    backgroundColor1: 'rgba(47, 53, 66, 0.06)',
                    backgroundColor2: 'rgba(246, 78, 78, 0.2)',
                });
            }
        }
    }

    focusTouch = (nameBorder) => {
        this.setState({
            chooseAnswer: nameBorder
        });

        if(nameBorder == '0'){
            this.setState({
                borderColor0: 'rgba(47, 53, 66, 0.8)',
                borderColor1: 'white',
                borderColor2: 'white',
            });
        }else if(nameBorder == '1'){
            this.setState({
                borderColor0: 'white',
                borderColor1: 'rgba(47, 53, 66, 0.8)',
                borderColor2: 'white'
            });
        }else if(nameBorder == '2'){
            this.setState({
                borderColor0: 'white',
                borderColor1: 'white',
                borderColor2: 'rgba(47, 53, 66, 0.8)'
            });
        }
    }

    //show menanam
    showRencanaPerawatan = async () => {
        try{
            //mencari data rencana perawatan berdasarkan id user
            const {idUser} = this.state;

            await firestore()
            .collection('data_rencana_perawatan')
            .doc(idUser)
            .get()
            .then(snapshot => {
                this.setState({
                    keyPerawatan: Object.keys(snapshot.data()),
                    valuePerawatan: Object.values(snapshot.data())
                });

                this.allDataPerawatan();
            });
        }catch(e){
            console.log(e);
        }
    }

    allDataPerawatan = async () => {
        try{
            //mencocokkan data perawatan dan data rencana perawatan
            await firestore()
            .collection('data_perawatan')
            .get()
            .then(snapshot => {
                let dataPerawatan = [];

                snapshot.forEach(documentSnapShot => {
                    dataPerawatan.push(documentSnapShot.data());
                });

                let dataRencanaPerawatan = [];
                const {valuePerawatan} = this.state;

                dataPerawatan.forEach(itemData => {
                    for(let i = 0; i < dataPerawatan.length; i++){
                        if(itemData.id_menanam == valuePerawatan[i]){
                            dataRencanaPerawatan.push(itemData);
                        }
                    }
                });

                this.setState({
                    dataRencanaPerawatan
                });
            });
        }catch(e){
            console.log(e);
        }
    }

    //sudah menjalankan rencana perawatan
    checkRiwayatPerawatan = async () => {
        try{
            //mencari data riwayat perawatan berdasarkan id user
            const {keyData, idUser} = this.state;

            await firestore()
            .collection('data_riwayat_perawatan')
            .doc(idUser)
            .get()
            .then(snapshot => {
                let valueField = Object.values(snapshot.data()); 

                if(valueField.includes(keyData)){
                    this.deleteRencanaRunPerawatan1(keyData);
                }else{
                    this.deleteRencanaRunPerawatan(keyData);
                }
            })
            .catch(() => {
                this.deleteRencanaRunPerawatan(keyData);
            });
        }catch(e){
            console.log(e);
        }
    }

    deleteRencanaRunPerawatan1 = async (keyData) => {
        try{
            //menghapus salah satu isi di data rencana perawatan
            //tidak menambah data riwayat perawatan.
            const {keyPerawatan, valuePerawatan, idUser} = this.state;

            let valueDelete = valuePerawatan.indexOf(keyData);
            let keyDelete = keyPerawatan[valueDelete];

            await firestore()
            .collection('data_rencana_perawatan')
            .doc(idUser)
            .update({
                [keyDelete] : firestore.FieldValue.delete()
            })
            .then(snapshot => {
                this.updateCountTry();
            })
        }catch(e){
            console.log(e);
        }
    }

    deleteRencanaRunPerawatan = async (keyData) => {
        try{
            //menghapus salah satu isi di data rencana menanam
            //menambah data riwayat menanam.
            const {keyPerawatan, valuePerawatan, idUser} = this.state;

            let valueDelete = valuePerawatan.indexOf(keyData);
            let keyDelete = keyPerawatan[valueDelete];

            await firestore()
            .collection('data_rencana_perawatan')
            .doc(idUser)
            .update({
                [keyDelete] : firestore.FieldValue.delete()
            })
            .then(snapshot => {
                this.searchIdRiwayatPerawatan(keyData);
            })
        }catch(e){
            console.log(e);
        }
    }

    searchIdRiwayatPerawatan = async (keyData) => {
        try{
            //mencari id user di data riwayat menanam
            await firestore()
            .collection('data_riwayat_perawatan')
            .get()
            .then(snapshot => {
                let dataIdRiwayatPerawatan = [];

                snapshot.forEach(documentSnapShot => {
                    dataIdRiwayatPerawatan.push(documentSnapShot.id);
                });

                const {idUser} = this.state;

                if(dataIdRiwayatPerawatan.includes(idUser)){
                    this.searchFieldRiwayatPerawatan(idUser, keyData);
                }else{
                    this.makeRiwayatPerawatan(idUser, keyData);
                }
            });
        }catch(e){
            console.log(e);
        }
    }

    searchFieldRiwayatPerawatan = async (idUser, keyData) => {
        try{
            //mencari nilai field terakhir di data riwayat perawatan berdasarkan id user
            await firestore()
            .collection('data_riwayat_perawatan')
            .doc(idUser)
            .get()
            .then(snapshot => {
                let dataKeyField = Object.keys(snapshot.data());
                let countDataKey = dataKeyField.length;
                let keyField = dataKeyField[countDataKey-1];

                if(countDataKey > 0){
                    this.addRiwayatPerawatan(keyField, idUser, keyData);
                }else{
                    this.makeRiwayatPerawatan(idUser, keyData);
                }
                
            });
        }catch(e){
            console.log(e);
        }
    }

    addRiwayatPerawatan = async (keyField, idUser, keyData) => {
        try{
            //menambah data riwayat perawatan dengan key field yang sudah ditentukan
            let newKeyField = parseInt(keyField) + 1;

            await firestore()
            .collection('data_riwayat_perawatan')
            .doc(idUser)
            .update({
                [newKeyField] : keyData
            })
            .then(() => {
                this.updateCountTry();
            })
        }catch(e){
            console.log(e);
        }
    }

    makeRiwayatPerawatan = async (idUser, keyData) => {
        try{
            //menambah data riwayat menanam dengan key field 0
            //karena belum ada data sama sekali
            await firestore()
            .collection('data_riwayat_perawatan')
            .doc(idUser)
            .set({
                0 : keyData
            })
            .then(() => {
                this.updateCountTry();
            });
        }catch(e){
            console.log(e);
        }
    }

    updateCountTry = async () => {
        try{
            const {keyData, idUser} = this.state;

            await firestore()
            .collection('data_perawatan')
            .doc(keyData)
            .get()
            .then(snapshoot => {
                let countTry = parseInt(snapshoot.data().jumlah_mencoba);

                //proses update jumlah mencoba
                firestore()
                .collection('data_perawatan')
                .doc(keyData)
                .update({
                    jumlah_mencoba: countTry + 1
                })
                .then(snapshoot => {
                    this.deleteDocEmpty(idUser);
                })
            })
        }catch(e){
            console.log(e);
        }
    }

    //for delete doc merawat empty
    deleteDocEmpty = async (idUser) => {
        try{
            await firestore()
            .collection('data_rencana_perawatan')
            .doc(idUser)
            .get()
            .then(snapshot => {
                console.log('deleteDocEmpty');

                let dataKey = Object.keys(snapshot.data());

                if(dataKey.length == 0){
                    firestore()
                    .collection('data_rencana_perawatan')
                    .doc(idUser)
                    .delete()
                    .then(() => {
                        this.props.navigation.navigate('Beranda');
                    })
                }else{
                    this.props.navigation.navigate('Beranda');
                }
            });
        }catch(e){
            console.log(e);
        }
    }

    render(){
        const {pertanyaan, itemPilihanJawaban, labelButtonBottom, numQuiz, valueDisabled} = this.state;

        return (
            <View style={styles.containerPage}>
                <HeaderQuiz/>
    
                <ScrollView style={styles.containerContent}>
                    <Text style={styles.titleHeader}>PERTANYAAN {numQuiz}/3</Text>
                    <Text style={styles.question}>{pertanyaan}</Text>
    
                    <TouchableOpacity 
                        style={[styles.containerTitleAnswer, {borderColor: this.state.borderColor0, backgroundColor: this.state.backgroundColor0}]} 
                        onPress={() => this.focusTouch('0')}
                        disabled={valueDisabled}
                    >
                        <Text style={styles.Answer}>{itemPilihanJawaban[0]}</Text>

                            <View style={styles.containerIcon}>
                                {
                                    this.state.resultAnswer == 'none' ?
                                        <View></View>
                                    :
                                        this.state.resultAnswer == true ?
                                            
                                            this.state.trueAnswer == '0' ?
                                                <IconCorrect/>
                                            :
                                                <View></View>
                                        :
                                            this.state.trueAnswer == '0' ?
                                                <IconWrong/>
                                            :
                                                <View></View>
                                }
                            </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.containerTitleAnswer, {borderColor: this.state.borderColor1, backgroundColor: this.state.backgroundColor1}]} 
                        onPress={() => this.focusTouch('1')}
                        disabled={valueDisabled}
                    >
                        <Text style={styles.Answer}>{itemPilihanJawaban[1]}</Text>

                            <View style={styles.containerIcon}>
                                {
                                    this.state.resultAnswer == 'none' ?
                                        <View></View>
                                    :
                                        this.state.resultAnswer == true ?
                                            this.state.trueAnswer == '1' ?
                                                <IconCorrect/>
                                            :
                                                <View></View>
                                        :
                                            this.state.trueAnswer == '1' ?
                                                <IconWrong/>
                                            :
                                                <View></View>
                                }
                            </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.containerTitleAnswer, {borderColor: this.state.borderColor2, backgroundColor: this.state.backgroundColor2}]} 
                        onPress={() => this.focusTouch('2')}
                        disabled={valueDisabled}
                    >
                        <Text style={styles.Answer}>{itemPilihanJawaban[2]}</Text>

                            <View style={styles.containerIcon}>
                                {
                                    this.state.resultAnswer == 'none' ?
                                        <View></View>
                                    :
                                        this.state.resultAnswer == true ?
                                            this.state.trueAnswer == '2' ?
                                                <IconCorrect/>
                                            :
                                                <View></View>
                                        :
                                            this.state.trueAnswer == '2' ?
                                                <IconWrong/>
                                            :
                                                <View></View>
                                }
                            </View>
                    </TouchableOpacity>
                </ScrollView>

                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.containerTouchCek} onPress={() => this.checkAnswer()}>
                        <Text style={styles.titleCek}>{labelButtonBottom}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default QuizPerawatan;

const styles = StyleSheet.create({
    containerPage: {
        height: '100%',
        backgroundColor: 'white',
    },
    containerContent: {
        marginHorizontal: 20,
        marginBottom: 40,
        backgroundColor: 'white'
    },
    titleHeader: {
        color: '#2F3542',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        marginBottom: 20
    },
    question: {
        color: '#2F3542',
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        marginBottom: 40
    },
    containerTitleAnswer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 30
    },
    Answer: {
        width: '90%',
        color: '#2F3542',
        fontFamily: 'Poppins-Light',
        fontSize: 11.5
    },
    containerIcon: {
        width: '7%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    containerTouchCek: {
        width: 120,
        backgroundColor: '#5AA469',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    titleCek: {
        color: 'white',
        fontFamily: 'Poppins-Light',
        fontSize: 11,
        textAlign: 'center'
    }
})
