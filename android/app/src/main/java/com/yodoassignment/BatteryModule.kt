package com.yodoassignment

import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class BatteryModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "BatteryModule"
    }

    @ReactMethod
    fun getBatteryLevel(promise: Promise) {
        try {
            val context = reactApplicationContext
            val batteryIntent = context?.registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))
            
            if (batteryIntent != null) {
                val level = batteryIntent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1)
                val scale = batteryIntent.getIntExtra(BatteryManager.EXTRA_SCALE, -1)
                
                if (level >= 0 && scale > 0) {
                    val batteryLevel = (level * 100 / scale.toFloat()).toDouble()
                    promise.resolve(batteryLevel)
                } else {
                    promise.reject("UNKNOWN_ERROR", "Unable to get battery level")
                }
            } else {
                promise.reject("UNKNOWN_ERROR", "Unable to get battery information")
            }
        } catch (e: Exception) {
            promise.reject("UNKNOWN_ERROR", e.message, e)
        }
    }
}
