import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { IconShowWhite, IconHideWhite } from '../../assets/assets.js';

class ItemFormText extends Component{
    constructor(props){
        super(props);

        this.state = {
            secureTextEntry: true,
            iconName: <IconHideWhite/>
        }
    }

    onIconPress = () => {
        let iconName = (this.state.secureTextEntry) ? <IconShowWhite/> : <IconHideWhite/>;

        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        })
    }

    render(){
        const {label, autoCapitalize, nameState, value, onChangeText, notice} = this.props;

        return(
            <View style={styles.containerItemForm}>
                <Text style={styles.nameInput}>{label}</Text>

                {
                    label == 'kata sandi' ?
                        <View>
                            <View style={styles.containerInputPassword}>
                                <TextInput 
                                    style={styles.inputPassword} 
                                    secureTextEntry={this.state.secureTextEntry} 
                                    selectionColor='#5AA469'
                                    value={value}
                                    onChangeText={(text)=>onChangeText(nameState, text)}
                                />
                                
                                <TouchableOpacity style={styles.touchIconPassword} onPress={this.onIconPress}>
                                    {this.state.iconName}
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.textNotice}>{notice}</Text>
                        </View>
                        
                    :

                        <View>
                            <TextInput 
                                style={styles.formInput} 
                                autoCapitalize={autoCapitalize} 
                                selectionColor='#FDB827'
                                value={value}
                                onChangeText={(text)=>onChangeText(nameState, text)}
                            />
                            
                            <Text style={styles.textNotice}>{notice}</Text>
                        </View>
                }
                
            </View>
        );
    }
}


export default ItemFormText;

const styles = StyleSheet.create({
    containerItemForm: {
        marginBottom: 13
    },
    nameInput: {
        color: 'white',
        fontSize: 11.4,
        fontFamily: 'Poppins-Light',
        marginLeft: 20,
        marginBottom: 3
    },
    formInput: {
        width: 300,
        borderRadius: 50,
        paddingHorizontal: 21,
        paddingVertical: 5.8,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        color: 'white',
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
    },
    textNotice: {
        color: '#FDB827',
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        marginLeft: 20,
        
    },
    containerInputPassword: {
        flexDirection: 'row',
        width: 300,
        borderRadius: 50,
        paddingHorizontal: 21,
        paddingVertical: 4,
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
});