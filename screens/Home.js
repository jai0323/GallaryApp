import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import Card from "../components/Card";
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export default function Home(){
  const [photos, setPhotos] = useState([]);
  const [offlinePhotos, setOfflinePhotos] = useState([]);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    fetchPhotos();
    checkInternetConnection();
    loadCachedPhotos();
    
  }, []);

    const fetchPhotos = async () => {
        try {
          const response = await axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s');
          const data = response.data;
          const fetchedPhotos = data.photos.photo.map(photo => ({
            id: photo.id,
            title: photo.title,
            url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
          }));
          setPhotos(fetchedPhotos);
          cachePhotos(fetchedPhotos);
        } catch (error) {
          console.error('Error fetching photos:', error);
        }
      };
    
    const cachePhotos = async (photos) => {
      try {
        await AsyncStorage.setItem('cachedPhotos', JSON.stringify(photos));
      } catch (error) {
        console.error('Error caching photos:', error);
      }
    };

    const loadCachedPhotos = async () => {
        try {
          const cachedPhotos = await AsyncStorage.getItem('cachedPhotos');
          if (cachedPhotos !== null) {
            setOfflinePhotos(JSON.parse(cachedPhotos));
          }
        } catch (error) {
          console.error('Error loading cached photos:', error);
        }
      };

      const checkInternetConnection = async () => {
        const isConnected = await FileSystem.getInfoAsync(FileSystem.documentDirectory);
        NetInfo.fetch().then(state => {
          // console.log('Connection type', state.type);
          // console.log('Is connected?', state.isConnected);
          setIsOffline(!state.isConnected);
        });
        //console.log(!isConnected.exists,"======",offlinePhotos.length);
        
      };
    

    return(
        <View style={{flex:1, backgroundColor:"#F8F8F8"}}>
            { isOffline && offlinePhotos.length > 0  ? 
                <ScrollView horizontal={true}>
                  { offlinePhotos.map((photo)=>{
                    //console.log(photo)
                    return <Card key={photo.id} imageURL={photo.url}/>
                  })}
                </ScrollView>
                :
                <ScrollView horizontal={true}>
                  { photos.map((photo)=>{
                    //console.log("photo")
                    return <Card key={photo.id} imageURL={photo.url}/>
                  })}
                </ScrollView>
            }
        </View>
    )
}