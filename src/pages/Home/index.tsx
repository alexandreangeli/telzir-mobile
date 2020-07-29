import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AxiosResponse} from 'axios';
import MyPicker from '../../components/MyPicker';
import {colors} from '../../styleVariables';
import MyTextInput from '../../components/MyTextInput';
import {ICallPrice} from '../../models/CallPrice';
import {api} from '../../services/Api';
import MyPage from '../../components/MyPage';
import {IPlan, plans} from '../../models/Plan';
import RootNavigation from '../../services/RootNavigation';
import {IResultParams} from '../Result/types';

export default function Home() {
  const [callPrices, setCallPrices] = useState<ICallPrice[]>([]);
  const [originCities, setOriginCities] = useState<string[]>([]);
  const [destinationCities, setDestinationCities] = useState<string[]>([]);
  const [callTime, setCallTime] = useState<number>(60);
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [plan, setPlan] = useState<IPlan>({label: '', value: 0});

  useEffect(() => {
    async function getCallPrices() {
      api
        .get('/call_prices')
        .then((r: AxiosResponse<ICallPrice[]>) => {
          setCallPrices(r.data);
          setOriginCities([
            ...new Set(r.data.map((callPrice) => callPrice.origin)),
          ]);
        })
        .catch((e) => {
          console.error(e);
        });
    }
    getCallPrices();
  }, []);

  function updateDestinationCities(origin: string) {
    const newDestinationCities = [
      ...new Set(
        callPrices
          .filter((callPrice) => callPrice.origin == origin)
          .map((callPrice) => callPrice.destination),
      ),
    ];
    setDestinationCities(newDestinationCities);

    if (destination && !newDestinationCities.includes(destination)) {
      setDestination(newDestinationCities[0]);
    }
  }

  useEffect(() => {
    updateDestinationCities(origin);
  }, [origin]);

  function disableButton() {
    return !origin || !destination || !callTime || !plan.value;
  }

  return (
    <MyPage
      showLogo={true}
      footerButtons={[
        {
          label: 'CALCULAR',
          onPress: (e) => {
            RootNavigation.navigate<IResultParams>('Result', {
              origin: origin,
              destination: destination,
              callTime: callTime,
              plan: plan,
              callPrices: callPrices,
            });
          },
          disabled: disableButton(),
        },
      ]}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flex: 0.3,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 0.48}}>
            <MyPicker
              label="Origem"
              noValueIcon="phone"
              currentValue={origin}
              onValueChange={(itemValue) => {
                setOrigin(itemValue.toString());
                updateDestinationCities(itemValue.toString());
              }}
              options={originCities}
              flipNoValueIcon={false}
              backgroundColor={colors.lightBlue}></MyPicker>
          </View>
          <View style={{flex: 0.48, alignItems: 'flex-end'}}>
            <MyPicker
              label="Destino"
              noValueIcon="phone"
              currentValue={destination}
              onValueChange={(itemValue) => {
                setDestination(itemValue.toString());
              }}
              options={destinationCities}
              flipNoValueIcon={true}
              backgroundColor={colors.lightBlue}
              disabled={!destinationCities.length}></MyPicker>
          </View>
        </View>
        <View style={{flex: 0.3}}>
          <MyTextInput
            label="Minutos de chamada"
            currentValue={callTime.toString()}
            onChangeText={(itemValue) =>
              setCallTime(parseInt(itemValue || '0'))
            }
            backgroundColor={colors.lightBlue}
            textAfter="min"
            type="only-numbers"></MyTextInput>
        </View>
        <View style={{flex: 0.3}}>
          <MyPicker
            label="Plano"
            noValueIcon="dollar"
            currentValue={plan.label}
            onValueChange={(itemValue) => setPlan(itemValue)}
            options={plans}
            flipNoValueIcon={false}
            backgroundColor={colors.lightBlue}></MyPicker>
        </View>
      </View>
    </MyPage>
  );
}
