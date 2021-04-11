import React,{Component} from 'react'
import {View,StyleSheet,ScrollView,TouchableOpacity} from "react-native"
import {Text,TextInput,Button,Appbar} from 'react-native-paper'
import {Picker} from "@react-native-community/picker"
import DateTimePicker from "@react-native-community/datetimepicker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import SnackBar from "./SnackBar"
class AddTodo extends Component{
    state = {
        category:"study",
        title:"",
        description:"",
        intialdate:new Date(),
        showTime:false,
        showDate:false,
        from:"Time",
        to:"Time",
        finaldate:null,
        V:"",
        ID:"",
        opensnackbar:false
    }
    componentDidMount(){
        this.fetchID("id")
    }
    initID = () =>{
        if(this.state.ID === null){
            this.saveItem("id",1)
            this.saveItem("studyItem",0)
            this.saveItem("sportItem",0)
            this.saveItem("readingItem",0)
            this.saveItem("travelItem",0)
            this.saveItem("otherItem",0)
            this.fetchID("id")
        }
    }

    fetchID = (key) =>{
        try{
            const value = AsyncStorage.getItem(key)
            .then((res) => {
              const jsonData = res;
              this.setState({ID:jsonData},() => {this.initID()})
              return jsonData;
            })
            return value
        }
        catch(e){
            console.log("exception",e)
            return null
        }
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
    saveItem = async(key,item) =>{
        try{
            await AsyncStorage.setItem(key,JSON.stringify(item))
        }
        catch(e){

        }
    }
    setSnackbarvisibility = (vis) =>{this.setState({opensnackbar:vis})}
    openTime = (v)=>{
        this.setState({V:v})
        this.setState({showTime:true})
    }
    openDate = ()=>{
        this.setState({showDate:true})
    }
    changeTo = (val) =>{
        var time = val == undefined ? "Time" : new Date(val).toTimeString()
        var timestring = time.split(" ")[0].split(":").slice(0,2).join().replace(",",":")
        this.setState({to:timestring,showTime:false})
    }
    changeFrom = (val) =>{
        var time = val == undefined ? "Time" : new Date(val).toTimeString()
        var timestring = time.split(" ")[0].split(":").slice(0,2).join().replace(",",":")
        this.setState({from:timestring,showTime:false})
    }
    changeDate = (val) =>{
        var date = val == undefined ? this.state.intialdate:new Date(val)
        this.setState({finaldate:date,showDate:false})
    }
    savedata = () =>{
        var obj = {
            "title":this.state.title,
            "description":this.state.description,
            "category":this.state.category,
            "date":this.state.finaldate == null ? this.state.intialdate : this.state.finaldate,
            "from":this.state.from == "Time" ? "" : this.state.from,
            "to":this.state.to == "Time" ? "" : this.state.to
        }
        
        if(obj.title.trim() !== "" && obj.from != "Time" && obj.to != "Time"){
            this.saveItem(this.state.ID,obj)
            this.saveItem("id",Number.parseInt(this.state.ID)+1)
            this.fetchID("id")
            this.getItem(obj.category+"Item").then((value)=>{
                this.saveItem(obj.category+"Item",Number.parseInt(value)+1)
            })
            this.setSnackbarvisibility(true)
        }
    }
    
    render(){
        const navigation = this.props.navigation
        return(
            <View>
                <ScrollView>
                    <View style = {styles.container}>
                        <Appbar.Header>
                            <Appbar.BackAction onPress = {()=>{navigation.pop()}} />
                            <Appbar.Content title = "Add Your Goal" />
                        </Appbar.Header>
                            <TextInput mode = "outlined"  style = {styles.textinputStyle} placeholder = "Title" onChangeText = {(value) =>{this.setState({title:value})}} />
                            <TextInput mode = "outlined" style = {styles.textinputStyle} multiline numberOfLines = {5} maxLength = {50} scrollEnabled placeholder = "Short Description (Optional)" onChangeText = {(value) =>{this.setState({description:value})}} />
                        <Picker style = {{marginTop:10,width:150}} mode = "dialog" prompt = "category"
                        selectedValue = {this.state.category}
                        onValueChange = {(itemValue,index) =>{
                            this.setState({category:itemValue})
                        }}
                        >
                            <Picker.Item label = "Study" value = "study" />
                            <Picker.Item label = "Sports" value = "sport" />
                            <Picker.Item label = "Travel" value = "travel" />
                            <Picker.Item label = "Reading" value = "reading" />
                            <Picker.Item label = "Other" value = "other" />
                        </Picker>

                        <View>
                            <TouchableOpacity onPress = {() =>{this.openDate()}}>
                            <View style = {{flex:1,justifyContent:"flex-start",flexDirection:"row",alignContent:"space-between"}}>
                                <Text style = {{...styles.textstyle,flex:1}}>Date</Text>
                                <Text style = {{...styles.textstyle,flex:2}}>{!this.state.finaldate ? this.state.intialdate.toDateString() : this.state.finaldate.toDateString()}</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {() =>{this.openTime("from")}}>
                            <View style = {{flex:1,justifyContent:"flex-start",flexDirection:"row",alignContent:"space-between"}}>
                                <Text style = {{...styles.textstyle,flex:1}}>From</Text>
                                <Text style = {{...styles.textstyle,flex:2}}>{this.state.from}</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {() =>{this.openTime("to")}}>
                            <View style = {{flex:1,justifyContent:"flex-start",flexDirection:"row",alignContent:"space-between"}}>
                                <Text style = {{...styles.textstyle,flex:1}}>To</Text>
                                <Text style = {{...styles.textstyle,flex:2}}>{this.state.to}</Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                        {this.state.showDate && <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.intialdate}
                            mode="date"
                            display = "spinner" 
                            onTouchCancel = {(evt) =>{this.setState({showDate:false});this.setState({finaldate:this.state.intialdate})}}
                            onChange = {(dataObj,data) =>{this.changeDate(data)}}
                        />}
                        {this.state.showTime && <DateTimePicker
                            testID="dateTimePicker2"
                            value={this.state.intialdate}
                            mode="time"
                            dateFormat = "dd-mm-yyyy"
                            display = "default"
                            is24Hour={false}
                            onTouchCancel = {(evt) =>{this.setState({showTime:false})}}
                            onChange = {(dataObj,data) =>{this.state.V == "from" ? this.changeFrom(data) : this.changeTo(data)}}
                        />}
                        <Button style = {{marginTop:10}} mode="contained" onPress = {this.savedata}>Add</Button>
                    </View>
                </ScrollView>
                <SnackBar message = "Goal Set" onDismissSnackBar = {()=>{this.setSnackbarvisibility(false)}} visible = {this.state.opensnackbar} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingBottom:100
    },
    textinputStyle:{
        marginTop:5,
        marginBottom:5,
        borderStyle:"dotted",
        backgroundColor:"transparent"
    },
    textstyle:{
        fontSize:20,
        marginLeft:10,
        marginTop:5,
        marginBottom:5,
        color:"#1314157a"
    }
})
export default AddTodo