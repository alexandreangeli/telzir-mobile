import {View, Text} from 'react-native';
import React, {useState} from 'react';
import MyPage from '../../components/MyPage';
import {IPlan} from '../../models/Plan';
import {ICallPrice} from '../../models/CallPrice';
import {centsToReal} from '../../services/Utils';
import {colors, blueSquareStyle} from '../../styleVariables';
import {Props} from './types';
import RootNavigation from '../../services/RootNavigation';

export default function Result({route, navigation}: Props) {
  const [callPrices] = useState<ICallPrice[]>(route.params.callPrices);
  const [callTime] = useState<number>(route.params.callTime);
  const [origin] = useState<string>(route.params.origin);
  const [destination] = useState<string>(route.params.destination);
  const [plan] = useState<IPlan>(route.params.plan);
  const [callPrice] = useState(
    callPrices.find(
      (callPrice) =>
        callPrice.destination == destination && callPrice.origin == origin,
    ),
  );
  const [withoutFaleMais] = useState<number>(
    callPrice ? callTime * callPrice.cents_per_minute : 0,
  );
  const [withFaleMais] = useState<number>(
    callPrice
      ? Math.max(callTime - plan.value, 0) * callPrice.cents_per_minute * 1.1
      : 0,
  );

  return (
    <MyPage
      style={{justifyContent: 'space-between'}}
      footerButtons={[
        {
          label: 'VOLTAR',
          onPress: (e) => {
            RootNavigation.goBack();
          },
        },
      ]}>
      <View style={{flex: 0.1}}>
        <Text style={{textAlign: 'center', color: colors.white, fontSize: 30}}>
          Ligação de {origin} para {destination} por {callTime} minutos
        </Text>
      </View>
      <View style={{flex: 0.4, ...(blueSquareStyle as object)}}>
        <Text style={{color: colors.white, fontSize: 25}}>Sem plano</Text>
        <Text
          style={{
            color:
              withoutFaleMais < withFaleMais
                ? colors.lightGreen
                : colors.lightRed,
            fontSize: 30,
          }}>
          {centsToReal(withoutFaleMais)}
        </Text>
      </View>
      <View style={{flex: 0.4, ...(blueSquareStyle as object)}}>
        <Text style={{color: colors.white, fontSize: 25}}>
          Com {plan.label}
        </Text>
        <Text
          style={{
            color:
              withoutFaleMais >= withFaleMais
                ? colors.lightGreen
                : colors.lightRed,
            fontSize: 30,
          }}>
          {centsToReal(withFaleMais)}
        </Text>
      </View>
    </MyPage>
  );
}
