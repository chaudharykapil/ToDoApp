import React,{ Component } from "react";
import { Text,Button,Appbar} from "react-native-paper";
import { View,FlatList,StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListItem from "./ListItem"
import SnackBar from "./SnackBar";
class ShowGoals extends Component{
    state = {
        allGoals:[],
        allKeys:[],
        allGoalsObject:[],
        showsnackbar:false,
    }
    cat = this.props.route.params.cat
    getAllkeys = async() =>{
        await AsyncStorage.getAllKeys().then(keys=>{
            this.setState({allKeys:keys},() =>{this.getAllGoals()})
        })
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
    componentDidMount(){
        this.getAllkeys()
    }
    getAllGoals = async() =>{
        await AsyncStorage.multiGet(this.state.allKeys).then(goals=>{
            this.setState({allGoals:goals},()=>{this.parseGoals()})
        })
    }
    parseGoals = ()=>{
        var tempobj = []
        this.state.allGoals.map((item,index)=>{
            if(item[0] !="id"){
                tempobj.push({id:item[0],data:JSON.parse(item[1])})
            }
        })
        this.setState({allGoalsObject:tempobj},()=>{
            this.setState({allGoalsObject:this.state.allGoalsObject.filter((value,ind)=>{
                if(value.data){
                    return value.data.category == this.cat
                }
                return false
            })})
        })
    }
    removeitems = async(id)=>{
        this.getItem(id).then((value1)=>{
            this.getItem(JSON.parse(value1).category+"Item").then((value2)=>{
                this.saveItem(JSON.parse(value1).category+"Item",Number.parseInt(value2)-1)
            })
        })
        
        await AsyncStorage.removeItem(id)
    }
    
    render(){
        const navigation = this.props.navigation
        return(
            <View  >
                <Appbar.Header>
                        <Appbar.BackAction onPress = {()=>{navigation.pop()}} />
                        <Appbar.Content title = "Your Goals" />
                </Appbar.Header>
                <FlatList
                    style = {{marginBottom:100}}
                    extraData = {true}
                    data={this.state.allGoalsObject}
                    renderItem={
                        ({item,index})=><ListItem items = {item.data} index = {index} removeitem = {()=>{this.removeitems(item.id).then(()=>{this.getAllGoals();this.setState({showsnackbar:true})})}}  />
                    }
                    keyExtractor={item => item.id}
                />
                <SnackBar style= {{position:"absolute",bottom:0}} visible = {this.state.showsnackbar} message = "Item delete" onDismissSnackBar = {()=>{this.setState({showsnackbar:false})}}/>
            </View>
        )
    }
}
export default ShowGoals