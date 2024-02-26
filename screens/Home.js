import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Card from "../components/Card";

export default function Home(){
    const [data, setData] = useState();
    useEffect(()=>{
        axios.get(
          'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s'
        ).then((response) => {
         setData(response.data.photos.photo);
        });
      },[]);

    return(
        <View style={{flex:1}}>
            {/* {console.log(data)} */}
            {/* {<Text>Hellomdfknvndzf.nkvndknvzdfnvjbzdvmm bvkflmvnbsjck,bvxnmv kljzhdczs,nvblxzmv mnbvkjdzfmvnjbsjc,b</Text>} */}
            {data && <FlatList 
                data={data}
                horizontal={true}
                renderItem={(itemData) =>{
                    return <Card imageURL={itemData.item.url_s}/>
                }}/>}
        </View>
    )
}