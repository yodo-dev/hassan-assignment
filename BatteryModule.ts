import { NativeModules, Platform } from 'react-native';

const { BatteryModule } = NativeModules;

interface BatteryModuleInterface {
  getBatteryLevel(): Promise<number>;
}



export default BatteryModule as BatteryModuleInterface;
