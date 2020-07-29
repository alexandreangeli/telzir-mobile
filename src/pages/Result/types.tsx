import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../services/RootNavigation';
import {IPlan} from '../../models/Plan';
import {ICallPrice} from '../../models/CallPrice';

export interface IResultParams {
  origin: string;
  destination: string;
  callTime: number;
  plan: IPlan;
  callPrices: ICallPrice[];
}

interface RouteInterface extends RouteProp<RootStackParamList, 'Result'> {
  params: IResultParams;
}

export type Props = {
  route: RouteInterface;
  navigation: StackNavigationProp<RootStackParamList, 'Result'>;
};
