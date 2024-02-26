import { Image, StyleSheet, View } from "react-native";

export default function Card({imageURL}){
    //console.log(imageURL)
    return(
        <View style={styles.conatiner}>
            <Image style={styles.image} source={{
                uri: imageURL,
            }}/>
        </View>
    )
}
const styles = StyleSheet.create({
    conatiner:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:5
    },
    image:{
        
        width: 350,
        height: 300,
    }
})