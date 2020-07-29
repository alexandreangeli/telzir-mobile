import {View, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {colors} from '../styleVariables';

interface IProps {
  show: boolean;
}

function MyLoading({show}: IProps) {
  return (
    <Modal transparent visible={show}>
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color={colors.lightRed} />
      </View>
    </Modal>
  );
}

export default MyLoading;
