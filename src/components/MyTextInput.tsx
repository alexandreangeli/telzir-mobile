import {TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
import {TextInputMask, TextInputMaskTypeProp} from 'react-native-masked-text';
import {colors, blueSquareStyle} from '../styleVariables';

interface IProps {
  onChangeText:
    | ((text: string, rawText?: string | undefined) => void)
    | undefined;
  currentValue: string | undefined;
  label: string;
  backgroundColor: string;
  textAfter?: string;
  type: TextInputMaskTypeProp;
  isSquare?: boolean;
}

function MyTextInput({
  onChangeText,
  currentValue,
  label,
  backgroundColor,
  textAfter,
  type,
  isSquare,
}: IProps) {
  let inputRef = React.useRef<TextInputMask>(null);

  return (
    <TouchableOpacity
      onPress={() => {
        (inputRef.current as any).getElement().blur();
        (inputRef.current as any).getElement().focus();
      }}
      style={{
        ...(blueSquareStyle as object),
        aspectRatio: isSquare ? 1 : undefined,
        backgroundColor: backgroundColor,
      }}>
      <View style={{flexDirection: 'row'}}>
        <TextInputMask
          maxLength={10}
          ref={inputRef}
          type={type}
          value={currentValue}
          onChangeText={onChangeText}
          style={{
            color: colors.white,
            fontSize: 30,
          }}
        />
        {textAfter ? (
          <Text
            style={{
              color: colors.lightRed,
              textAlignVertical: 'bottom',
              fontSize: 20,
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
