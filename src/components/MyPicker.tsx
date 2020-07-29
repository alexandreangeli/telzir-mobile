import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {colors, blueSquareStyle} from '../styleVariables';
import {CustomPicker} from 'react-native-custom-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps {
  onValueChange: ((value: any) => void) | undefined;
  options: any[];
  currentValue: any;
  label: string;
  noValueIcon: string;
  flipNoValueIcon: boolean;
  backgroundColor: string;
  disabled?: boolean;
  isSquare?: boolean;
}

function MyPicker({
  onValueChange,
  options,
  currentValue,
  label,
  noValueIcon,
  flipNoValueIcon,
  backgroundColor,
  disabled,
  isSquare,
}: IProps) {
  let pickerRef = React.useRef<CustomPicker>(null);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => (disabled ? null : pickerRef.current?.showOptions())}
      style={{
        ...(blueSquareStyle as object),
        aspectRatio: isSquare ? 1 : undefined,
        backgroundColor: backgroundColor,
        opacity: disabled ? 0.5 : 1,
      }}>
      {currentValue ? (
        <Text style={{color: colors.white, fontSize: 30}}>{currentValue}</Text>
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
          getLabel={(e) => e.label || e}
          modalStyle={{
            backgroundColor: colors.lightBlue,
            borderColor: colors.lightRed,
            borderBottomWidth: 1,
          }}
          optionTemplateProps={{
            containerStyle: {
              borderColor: colors.lightRed,
              borderWidth: 1,
              borderBottomColor: colors.lightRed,
              borderBottomWidth: 0,
              justifyContent: 'center',
              height: 50,
            },
            textStyle: {
              borderColor: colors.lightRed,
              fontSize: 18,
            },
          }}
          fieldTemplateProps={{
            clearImage: <View />,
          }}></CustomPicker>
      </View>
    </TouchableOpacity>
  );
}

export default MyPicker;
