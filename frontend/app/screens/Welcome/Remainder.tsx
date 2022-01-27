import {days, DAYSPROPS, WIDTH} from '@constants/const';
import {AuthContext} from '@context/AuthContextProvider';
import {ThemeContext} from '@context/ThemeContext';
import {MyText, SafeView} from '@elements/SharedElements';
import useStyle from '@hooks/useStyle';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useContext, useState} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

export const Days = (props: any) => {
  const {setAllDay, allDay, day} = props;
  const [daySelected, setDaySelected] = useState<boolean>(false);
  const handleClick = () => {
    if (daySelected === false) {
      setDaySelected(true);
      setAllDay(allDay.concat(day));
    } else if (daySelected === true) {
      setDaySelected(false);
      setAllDay(allDay.filter((d: DAYSPROPS) => d !== day));
    }
  };
  const {color} = useStyle();

  return (
    <Pressable
      onPress={() => {
        handleClick();
      }}
      style={{
        backgroundColor: daySelected ? color.inverse : color.main,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderColor: color.inverse,
        borderWidth: 1,
      }}>
      <MyText color={daySelected ? color.main : color.inverse}>
        {day.substring(0, 2)}
      </MyText>
    </Pressable>
  );
};

const Remainder = () => {
  const [time, setTime] = useState(new Date(1598055340000));
  const [show, setShow] = useState(false);
  const [allDay, setAllDay] = useState<typeof days>([]);
  const {color} = useStyle();
  const {toggleTheme} = useContext(ThemeContext);
  const {authContext} = useContext(AuthContext);

  const showTime = () => {
    setShow(true);
  };

  const onChange = (_: any, selectedDate: any) => {
    const currentDate = selectedDate || time;
    setTime(currentDate);
    setShow(false);
  };

  const datatoSave = () => {
    if (allDay.length < 1) {
      Alert.alert('Uh Oh!', 'You must select at least 1 day to continue');
    } else {
      console.log(allDay);
      console.log(moment(time).format('h:mm A'));
      authContext.signIn('A');
    }
  };

  return (
    <SafeView>
      <ScrollView>
        <View style={{padding: 20}}>
          <MyText title style={{maxWidth: WIDTH * 0.8, marginTop: 10}}>
            What time would you like to meditate?
          </MyText>
          <MyText style={{maxWidth: WIDTH * 0.9}} color={color.grey}>
            Any time you can choose but We recommend first thing in th morning.
          </MyText>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 20,
              flexWrap: 'wrap',
            }}>
            <MyText fontSize={25}>Time: </MyText>
            <Pressable
              onPress={showTime}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <MyText title style={{marginRight: 10}}>
                {moment(time).format('h:mm A')}
              </MyText>
              <Icon name="edit" size={25} color={color.textColor} />
            </Pressable>
          </View>

          {show && (
            <DateTimePicker
              onChange={onChange}
              display="default"
              mode="time"
              value={time}
            />
          )}

          <MyText title style={{maxWidth: WIDTH * 0.8, marginTop: 50}}>
            Which day would you like to meditate?
          </MyText>
          <MyText style={{maxWidth: WIDTH * 0.9}} color={color.grey}>
            Everyday is best, but we recommend picking at least five.
          </MyText>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 30,
            }}>
            {days.map((day, index) => {
              return (
                <Days key={index} {...{day}} {...{allDay}} {...{setAllDay}} />
              );
            })}
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 170,
            }}>
            <Pressable
              style={[
                styles.btn,
                {
                  backgroundColor: color.inverse,
                },
              ]}
              onPress={datatoSave}>
              <MyText center fontSize={24} color={color.main}>
                Continue
              </MyText>
            </Pressable>
            <Pressable
              style={{...styles.btn, backgroundColor: 'transparent'}}
              onPress={toggleTheme}>
              <MyText center fontSize={24}>
                No Thanks
              </MyText>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default Remainder;

const styles = StyleSheet.create({
  btn: {
    padding: 17,
    borderRadius: 35,
    width: WIDTH * 0.8,
  },
});
