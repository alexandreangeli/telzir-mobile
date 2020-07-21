import {TextInput, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-community/picker';
import axios, {AxiosResponse} from 'axios';

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
  const [plan, setPlan] = useState(plans[0]);

  useEffect(() => {
    async function getCallPrices() {
      axios
        .get('http://10.0.2.2:5000/call_prices')
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

    if (!newDestinationCities.includes(destination)) {
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
    debugger;
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
    <>
      <Text>Origem</Text>
      <Picker
        selectedValue={origin}
        onValueChange={(itemValue, itemIndex) => {
          setOrigin(itemValue.toString());
          updateDestinationCities(itemValue.toString());
        }}>
        {originCities.map((city) => (
          <Picker.Item key={'origin-' + city} label={city} value={city} />
        ))}
      </Picker>
      <Text>Destino</Text>
      <Picker
        selectedValue={destination}
        onValueChange={(itemValue, itemIndex) =>
          setDestination(itemValue.toString())
        }>
        {destinationCities.map((city) => (
          <Picker.Item key={'destination-' + city} label={city} value={city} />
        ))}
      </Picker>
      <Text>Minutos de chamada</Text>
      <TextInput
        textContentType="telephoneNumber"
        dataDetectorTypes="phoneNumber"
        keyboardType="phone-pad"
        onChangeText={(text) => {
          text.replace(/[^0-9]/g, '');
          setCallTime(parseInt(text || '0'));
        }}
        value={callTime.toString()}></TextInput>
      <Text>Plano</Text>
      <Picker
        selectedValue={plan.value}
        onValueChange={(itemValue, itemIndex) => setPlan(plans[itemIndex])}>
        {plans.map((plan) => (
          <Picker.Item
            key={'plan-' + plan.label}
            label={plan.label}
            value={plan.value}
          />
        ))}
      </Picker>
      <Text>Sem FaleMais: {withoutFaleMais()}</Text>
      <Text>Com FaleMais: {withFaleMais()}</Text>
    </>
  );
}
