import Foundation
import UIKit
import React

@objc(BatteryModule)
class BatteryModule: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc
  func getBatteryLevel(_ resolve: @escaping RCTPromiseResolveBlock,
                       rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      let device = UIDevice.current
      device.isBatteryMonitoringEnabled = true
      
      if device.batteryState == .unknown {
        reject("UNKNOWN_ERROR", "Unable to get battery level", nil)
        return
      }
      
      let batteryLevel = device.batteryLevel
      if batteryLevel < 0 {
        reject("UNKNOWN_ERROR", "Battery level not available", nil)
        return
      }
      
      let percentage = Double(batteryLevel * 100.0)
      resolve(percentage)
    }
  }
}

