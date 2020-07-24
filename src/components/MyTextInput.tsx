import {TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
import {TextInputMask, TextInputMaskTypeProp} from 'react-native-masked-text';
import {colors} from '../styleVariables';

interface IProps {
  onChangeText:
    | ((text: string, rawText?: string | undefined) => void)
    | undefined;
  currentValue: string | undefined;
  label: string;
  width: number | string;
  height?: number | string;
  backgroundColor: string;
  textAfter?: string;
  type: TextInputMaskTypeProp;
}

function MyTextInput({
  onChangeText,
  currentValue,
  label,
  width,
  height,
  backgroundColor,
  textAfter,
  type,
}: IProps) {
  let inputRef = React.useRef<TextInputMask>(null);

  return (
    <TouchableOpacity
      onPress={() => (inputRef.current as any).getElement().focus()}
      style={{
        aspectRatio: height ? undefined : 1,
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 20,
      }}>
      <View style={{flexDirection: 'row'}}>
        <TextInputMask
          ref={inputRef}
          type={type}
          value={currentValue}
          onChangeText={onChangeText}
          style={{
            color: colors.white,
            fontSize: 25,
          }}
        />
        {textAfter ? (
          <Text
            style={{
              color: colors.white,
              textAlignVertical: 'bottom',
              marginBottom: 15,
            }}>
            {textAfter}
          </Text>
        ) : null}
      </View>
      <Text style={{color: colors.white, fontSize: 25}}>{label}</Text>
    </TouchableOpacity>
  );
}

export default MyTextInput;
