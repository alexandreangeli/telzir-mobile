import {
  View,
  Dimensions,
  StyleProp,
  ViewStyle,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  Text,
  StatusBar,
} from 'react-native';
import {colors} from '../styleVariables';
import React, {ReactNode} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

interface IProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  showLogo?: boolean;
  footerButtons?: {
    label: string;
    onPress: (event: GestureResponderEvent) => void;
    color?: string;
    disabled?: boolean;
  }[];
}

function myPage({style, showLogo, children, footerButtons}: IProps) {
  return (
    <ScrollView>
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
          height:
            Math.round(Dimensions.get('window').height) -
            (StatusBar.currentHeight || 0),
        }}>
        {showLogo ? (
          <View style={{flexBasis: '15%', margin: 20}}>
            <Image
              style={{
                flex: 1,
                width: undefined,
                height: undefined,
                resizeMode: 'contain',
              }}
              source={require('../assets/logo-horizontal.png')}></Image>
          </View>
        ) : null}

        <View style={{flex: 1, margin: 20, flexGrow: 1, ...(style as object)}}>
          {children}
        </View>

        {footerButtons?.length ? (
          <View
            style={{
              flexBasis: '8%',
              flexDirection: 'row',
            }}>
            {footerButtons.map((button, index) => (
              <TouchableOpacity
                key={'footer-botton' + index}
                disabled={button.disabled}
                onPress={(e) => button.onPress(e)}
                style={{
                  backgroundColor: button.color || colors.lightRed,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  flex: 1 / footerButtons.length,
                  opacity: button.disabled ? 0.5 : 1,
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 25,
                  }}>
                  {button.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

export default myPage;
