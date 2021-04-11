import React from "react"
import {View,Image,Text,StyleSheet,TouchableHighlight,Animated} from "react-native"
import { Avatar } from "react-native-paper"
const ListItem = (props)=>{
    function selectIcon(cat){
        if(cat.toLowerCase() == "reading"){
            return <Image  style = {Styles.avtar}  source = {require("../icons/reading.png")} />
        }
        else if(cat.toLowerCase() == "sport"){
            return <Image  style = {Styles.avtar}  source = {require("../icons/sports.png")} />
        }
        else if(cat.toLowerCase() == "travel"){
            return <Image  style = {Styles.avtar}  source = {require("../icons/travel.png")} />
        }
        else if(cat.toLowerCase() == "study"){
            return <Image  style = {Styles.avtar}  source = {require("../icons/study.png")} />
        }
        else{
            return <Image  style = {Styles.avtar}  source = {require("../icons/other.png")} />
        }
    }
    const fade = React.useRef(new Animated.Value(0)).current
    const [titlelength,setlenght] = React.useState(0)
    React.useEffect(()=>{
        Animated.timing(fade,
            {
                toValue:1,
                duration:500,
                useNativeDriver: true
            }
            ).start((res)=>{res.finished && props.items ? setlenght(props.items.title.length):setlenght(0)});
    })
    
    if(props.items != null){
        const icon = (props.items.category ? selectIcon(props.items.category) : null)
    return(
            <Animated.View style = {{...Styles.container,opacity:fade}}>
                <View>
                    {icon}
                </View>
                <View>
                    {titlelength >10 ? <Text style = {Styles.title}>{props.items.title.substring(0,10)}...</Text>:<Text style = {Styles.title}>{props.items.title}</Text>}
                    {props.items.description != "" ? <Text style = {Styles.description}>{props.items.description}</Text>:null}
                    {props.items ? <Text style = {Styles.category}><Text style = {Styles.labels}>Category:</Text> {props.items.category}</Text>:null}
                    <Text style = {Styles.datetime}><Text style = {Styles.labels}>Date:</Text> {new Date(props.items.date).toDateString()}</Text>
                    <Text style = {Styles.datetime}><Text style = {Styles.labels}>Time:</Text> {props.items.from} - {props.items.to}</Text>
                </View>
                <Avatar.Icon color = "black" style = {Styles.deleteIcon} icon = "delete" size = {50} onTouchEnd = {(evt) =>props.removeitem()} />
            </Animated.View>
    )
    }
    return (<View></View>)
}
const Styles = StyleSheet.create({
    title:{
        fontSize:22,
        fontFamily:"Roboto",
        fontWeight:"bold",
        

    },
    description:{
        fontSize:20,
    },
    category:{
        fontSize:15,
        fontFamily:"Roboto"
    },
    datetime:{
        fontSize:15,
    },
    datacontainer:{
    },
    container:{
        flexDirection:"row",
        margin:10,
        justifyContent:"space-between",
        borderRadius:10,
        borderColor:"black",
        elevation:5,
        shadowOpacity:1,
        shadowColor:"red",
        shadowOffset:{
            width:10,
            height:10
        },
        paddingBottom:5,
        paddingTop:5
    },
    avtar:{
        backgroundColor:"transparent",
        borderRadius:1,
        margin:10,
        height:70,
        width:70
    },
    labels:{
        color:"#919191"
    },
    deleteIcon:{
          backgroundColor:"transparent",
          alignSelf:"center"
    }

})
export default ListItem