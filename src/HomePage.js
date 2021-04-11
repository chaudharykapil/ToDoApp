import React,{ Component } from "react";
import { Text,Button,Appbar} from "react-native-paper";
import { View,FlatList,StyleSheet } from "react-native";
class HomePage extends Component{
    render(){
        const navigation = this.props.navigation
        return(
            <View style = {{flex:1}}>
                <Appbar.Header style = {{backgroundColor:"#7000aa"}}>
                <Appbar.Content title = "To Do List App" />
                </Appbar.Header>
                <View style = {Style.container}>
                    <Button style={Style.buttonstyle} mode ="contained" onPress = {()=>{navigation.navigate("AddToDo")}}>Add Your Goal</Button>
                    <Button style={Style.buttonstyle} mode ="contained" onPress = {()=>{navigation.navigate("ShowGoals")}}>Show Goals</Button>
                </View>
            </View>
        )
    }
}
const Style = StyleSheet.create({
    buttonstyle:{
        margin:10,
        width:200,
        alignSelf:"center"
    },
    container:{
        flex:1,
        justifyContent:"center",
        alignContent:"center"
    }
})
export default HomePage