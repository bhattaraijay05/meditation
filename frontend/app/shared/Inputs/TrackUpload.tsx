import {useMutation} from '@apollo/client';
import {MyText, SafeView} from '@elements/SharedElements';
import {UPLOAD_MUSIC} from '@graphql/mutation';
import useNavHelper from '@helpers/navHelper';
import useStyle from '@hooks/useStyle';
import BackHeader from '@shared/BackHeader';
import {createId} from '@utils/createId';
import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {HOST, PORT} from '../../../App';

const TrackUpload = () => {
  const [title, setTitle] = useState('');

  const [addTrack, {data, loading, error}] = useMutation(UPLOAD_MUSIC);
  const {color} = useStyle();
  const {handleBack} = useNavHelper();

  const [artist, setArtist] = useState('');
  const [url, setUrl] = useState('');
  const [album, setAlbum] = useState('');
  const [duration, setDuration] = useState('');
  const [image, setImage] = useState({
    path: '',
  });
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async () => {
    await addTrack({
      variables: {
        id: createId(),
        url: 'https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-equinox.mp3',
        title: title,
        artist: artist,
        artwork: 'https://picsum.photos/id/1016/200/300',
        album: album,
        duration: 100,
        category: ['kid', 'fav', 'anxious'],
        type: ['stressreducer', 'performanceimprove', 'bettersleep'],
        image:
          'https://images.unsplash.com/photo-1609873963505-a5061290ec5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
      },
    });
    setTitle('');
    setArtist('');
    setAlbum('');
    setDuration('');
    handleBack();
  };

  const addImage = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 130,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImage(image);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const urll = `http://${HOST}:${PORT}/image`;

  const uploadImage = async () => {
    const data = new FormData();
    data.append('image', image.path);
    console.log(data);
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    };
    fetch(urll, config)
      .then(checkStatusAndGetJSONResponse => {
        console.log(checkStatusAndGetJSONResponse);
      })
      .catch(err => {
        console.log('Error : -> ' + err);
      });
  };

  if (loading)
    return (
      // <LottieView source={require('@assets/lottie/update.json')} autoPlay />
      <MyText>Uploading</MyText>
    );

  if (error) return <MyText>{error.message}</MyText>;

  return (
    <SafeView>
      <ScrollView>
        <BackHeader title="Upload Music" />

        <TextInput
          placeholder="Title"
          style={[styles.input, {color: color.inverse}]}
          value={title}
          onChangeText={text => setTitle(text)}
          placeholderTextColor={color.grey}
        />

        <TextInput
          placeholder="Artist"
          style={[styles.input, {color: color.inverse}]}
          value={artist}
          onChangeText={text => setArtist(text)}
          placeholderTextColor={color.grey}
        />

        <TextInput
          placeholder="Album"
          style={[styles.input, {color: color.inverse}]}
          value={album}
          onChangeText={text => setAlbum(text)}
          placeholderTextColor={color.grey}
        />

        <>
          {image.path !== '' && (
            <Image
              source={{uri: image.path}}
              style={{
                width: 200,
                height: 130,
              }}
            />
          )}
        </>

        <Pressable
          onPress={handleSubmit}
          style={{
            backgroundColor: '#f00a',
            justifyContent: 'center',
            alignItems: 'center',
            width: 200,
            alignSelf: 'center',
            borderRadius: 20,
            height: 50,
          }}>
          <MyText color="#fff" fontSize={30}>
            Submit
          </MyText>
        </Pressable>
      </ScrollView>
    </SafeView>
  );
};

export default TrackUpload;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    borderColor: '#ddd',
  },
});
