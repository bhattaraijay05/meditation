import {useMutation} from '@apollo/client';
import {MyButton, MyText, SafeView} from '@elements/SharedElements';
import {UPDATE_TRACK_TITLE} from '@graphql/mutation';
import useNavHelper from '@helpers/navHelper';
import useStyle from '@hooks/useStyle';
import BackHeader from '@shared/BackHeader';
import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';

const TrackUpdate = (props: any) => {
  const {id} = props.route.params;
  const [title, setTitle] = useState('');
  const {handleBack} = useNavHelper();
  const {color} = useStyle();
  const [updateTitle, {data, loading, error}] = useMutation(UPDATE_TRACK_TITLE);

  const handleSubmit = async () => {
    await updateTitle({
      variables: {
        id,
        title,
      },
    });
    handleBack();
    handleBack();
  };

  if (loading) return <MyText>Updating</MyText>;
  if (error) return <MyText>`Submission error! ${error.message}`</MyText>;

  return (
    <SafeView>
      <BackHeader title="Edit Music" />

      <MyText>Id {id}</MyText>

      <TextInput
        placeholder="Enter your title"
        style={[styles.input, {color: color.inverse}]}
        value={title}
        onChangeText={text => setTitle(text)}
      />

      <MyButton onPress={handleSubmit}>Submit</MyButton>
    </SafeView>
  );
};

export default TrackUpdate;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ddd',
  },
});
