import React,{Component} from 'react'
import {Text,View,TouchableOpacity,StatusBar,StyleSheet} from "react-native"
import {FAB} from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage"
class HomeScreen extends Component{
    navigation = this.props.navigation
    state = {
        studyItem:0,
        sportItem:0,
        readingItem:0,
        travelItem:0,
        otherItem:0
    }
    getItem = (key) =>{
        try{
            const value = AsyncStorage.getItem(key)
            return value
        }
        catch(e){
            console.log("exception",e)
            return null
        }
    }
    setItems = ()=>{
        this.getItem("studyItem").then((value)=>{this.setState({studyItem:value})})
        this.getItem("sportItem").then((value)=>{this.setState({sportItem:value})})
        this.getItem("readingItem").then((value)=>{this.setState({readingItem:value})})
        this.getItem("travelItem").then((value)=>{this.setState({travelItem:value})})
        this.getItem("otherItem").then((value)=>{this.setState({otherItem:value})})
    }
    componentDidMount(){
        this.setItems()
    }
    render(){
        return(
            <View style = {{margin:50,marginRight:10,marginTop:20}}>
                <View style = {{flexDirection:"row",alignContent:"flex-start"}}>
                    <Text style = {{...Style.Label,color:"#f75700"}}>My</Text>
                    <Text style = {Style.Label}> Goals</Text>
                </View>
                <View style = {{marginTop:10,marginRight:20}}>
                    <Text style = {{fontSize:23,color:"#b8b8b8",fontFamily:"Roboto"}}>"If you aim at nothing, you will hit it every time."</Text>
                </View>
                <View style = {{marginTop:10}}>
                    <TouchableOpacity style = {{marginBottom:12,marginTop:12}} onPress = {()=>{this.navigation.navigate("ShowGoals",{cat:"study"})}}>
                        <View style = {{flexDirection:"row",alignContent:"space-between"}}>
                            <Text style = {{...Style.categories,flex:2}}>Study</Text>
                            <Text style = {{...Style.categories,flex:1}}>{this.state.studyItem}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{marginBottom:12,marginTop:12}} onPress = {()=>{this.navigation.navigate("ShowGoals",{cat:"sport"})}}>
                        <View style = {{flexDirection:"row",alignContent:"space-between"}}>
                            <Text style = {{...Style.categories,flex:2,color:"#f75700"}}>Sports</Text>
                            <Text style = {{...Style.categories,flex:1}}>{this.state.sportItem}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{marginBottom:12,marginTop:12}} onPress = {()=>{this.navigation.navigate("ShowGoals",{cat:"reading"})}}>
                        <View style = {{flexDirection:"row",alignContent:"space-between"}}>
                            <Text style = {{...Style.categories,flex:2}}>Reading</Text>
                            <Text style = {{...Style.categories,flex:1}}>{this.state.readingItem}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{marginBottom:12,marginTop:12}} onPress = {()=>{this.navigation.navigate("ShowGoals",{cat:"travel"})}}>
                        <View style = {{flexDirection:"row",alignContent:"space-between"}}>
                            <Text style = {{...Style.categories,flex:2,color:"#f75700"}}>Travel</Text>
                            <Text style = {{...Style.categories,flex:1}}>{this.state.travelItem}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{marginBottom:12,marginTop:12}} onPress = {()=>{this.navigation.navigate("ShowGoals",{cat:"other"})}}>
                        <View style = {{flexDirection:"row",alignContent:"space-between"}}>
                            <Text style = {{...Style.categories,flex:2}}>Other</Text>
                            <Text style = {{...Style.categories,flex:1}}>{this.state.otherItem}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style = {{marginTop:65}}>
                <FAB
                    style={Style.fab}
                    icon="plus"
                    overlayColor = "#f75700"
                    onPress={() => this.navigation.navigate("AddToDo")}
                />
                </View>
                <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#b8b8b8" translucent = {true}/>
            </View>
        )
    }
}
const Style = StyleSheet.create({
    Label:{
        fontSize:60,
        fontWeight:"bold"
    },
    categories:{
        fontSize:40,
        fontWeight:"bold" 
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 30,
        backgroundColor:"#f75700"
      }
})
export default HomeScreen