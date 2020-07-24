import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios, {AxiosResponse} from 'axios';
import MyPicker from '../../components/MyPicker';
import {colors} from '../../styleVariables';
import MyTextInput from '../../components/MyTextInput';
import MyFooterButton from '../../components/MyFooterButton';

export default function Home() {
  interface ICallPrice {
    id: number;
    origin: string;
    destination: string;
    cents_per_minute: number;
  }
  const [callPrices, setCallPrices] = useState<ICallPrice[]>([]);
  const [originCities, setOriginCities] = useState<string[]>([]);
  const [destinationCities, setDestinationCities] = useState<string[]>([]);
  const [callTime, setCallTime] = useState(60);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const plans = [
    {
      label: 'FaleMais 30',
      value: 30,
    },
    {
      label: 'FaleMais 60',
      value: 60,
    },
    {
      label: 'FaleMais 120',
      value: 120,
    },
  ];
  const [plan, setPlan] = useState({label: '', value: 0});

  useEffect(() => {
    async function getCallPrices() {
      axios
        // .get('http://10.0.2.2:5000/call_prices')
        .get('https://telzir-falemais-backend.herokuapp.com/call_prices')
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

  function centsToReal(cents: number) {
    return 'R$' + (cents / 100).toFixed(2);
  }

  function withoutFaleMais() {
    const callPrice = callPrices.find(
      (callPrice) =>
        callPrice.destination == destination && callPrice.origin == origin,
    );
    return callPrice ? centsToReal(callTime * callPrice.cents_per_minute) : 0;
  }

  function withFaleMais() {
    const callPrice = callPrices.find(
      (callPrice) =>
        callPrice.destination == destination && callPrice.origin == origin,
    );
    return callPrice
      ? centsToReal(
          Math.max(callTime - plan.value, 0) * callPrice.cents_per_minute * 1.1,
        )
      : 0;
  }

  return (
    <View style={{justifyContent: 'space-between', flex: 1}}>
      <View
        style={{
          flex: 0.9,
          margin: 20,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
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
            width="48%"
            backgroundColor={colors.lightBlue}></MyPicker>
          <MyPicker
            label="Destino"
            noValueIcon="phone"
            currentValue={destination}
            onValueChange={(itemValue) => {
              setDestination(itemValue.toString());
            }}
            options={destinationCities}
            flipNoValueIcon={true}
            width="48%"
            backgroundColor={colors.lightBlue}
            disabled={!destinationCities.length}></MyPicker>
        </View>
        <MyTextInput
          label="Minutos de chamada"
          currentValue={callTime.toString()}
          onChangeText={(itemValue) => setCallTime(parseInt(itemValue || '0'))}
          width="100%"
          height="30%"
          backgroundColor={colors.lightBlue}
          textAfter="min"
          type="only-numbers"></MyTextInput>
        <MyPicker
          label="Plano"
          noValueIcon="dollar"
          currentValue={plan.label}
          onValueChange={(itemValue) => setPlan(itemValue)}
          options={plans}
          flipNoValueIcon={false}
          width="100%"
          height="30%"
          backgroundColor={colors.lightBlue}></MyPicker>
        {/* <Text>Sem FaleMais: {withoutFaleMais()}</Text>
        <Text>Com FaleMais: {withFaleMais()}</Text> */}
      </View>
      <View style={{flex: 0.1}}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '100%',
            backgroundColor: colors.lightRed,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 25,
            }}>
            CALCULAR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
