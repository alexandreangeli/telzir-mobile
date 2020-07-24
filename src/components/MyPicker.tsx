import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {colors} from '../styleVariables';
import {CustomPicker} from 'react-native-custom-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps {
  onValueChange: ((value: any) => void) | undefined;
  options: any[];
  currentValue: any;
  label: string;
  noValueIcon: string;
  flipNoValueIcon: boolean;
  width: number | string;
  height?: number | string;
  backgroundColor: string;
  disabled?: boolean;
}

function MyPicker({
  onValueChange,
  options,
  currentValue,
  label,
  noValueIcon,
  flipNoValueIcon,
  width,
  height,
  backgroundColor,
  disabled,
}: IProps) {
  let pickerRef = React.useRef<CustomPicker>(null);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => (disabled ? null : pickerRef.current?.showOptions())}
      style={{
        aspectRatio: height ? undefined : 1,
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 20,
        opacity: disabled ? 0.5 : 1,
      }}>
      {currentValue ? (
        <Text style={{color: colors.white, fontSize: 20}}>{currentValue}</Text>
      ) : (
        <Icon
          name={noValueIcon}
          size={50}
          color={colors.white}
          style={flipNoValueIcon ? {transform: [{rotateY: '180deg'}]} : {}}
        />
      )}

      <Text style={{color: colors.white, fontSize: 25}}>{label}</Text>
      <View style={{position: 'absolute', width: 0, height: 0}}>
        <CustomPicker
          ref={pickerRef}
          onValueChange={onValueChange}
          options={options}
          getLabel={(e) => e.label || e}></CustomPicker>
      </View>
    </TouchableOpacity>
  );
}

export default MyPicker;
