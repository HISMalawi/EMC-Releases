package io.ionic.starter;

import android.util.Log;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.zebra.sdk.comm.ConnectionException;

@CapacitorPlugin(name = "LabelPrinter")
public class LabelPrinterPlugin extends Plugin {
    LabelPrinter implementation = new LabelPrinter();

    @PluginMethod
    public void write(PluginCall call) {
        String deviceID = call.getString("deviceID");
        String rawString = call.getString("rawString");

        if (deviceID == null || rawString == null) {
            call.reject("Missing deviceID or rawString to print");
            return;
        }
        try{
            implementation.write(deviceID, rawString);
            call.resolve();
        } catch (Exception e) {
            call.reject(e.getLocalizedMessage());
            return;
        }
    }

    @PluginMethod
    public void test(PluginCall call) throws Exception {
        String deviceID = call.getString("deviceID");
        if (deviceID == null) {
            call.reject("Device not found");
        }
        try {
            implementation.test(deviceID);
            Log.d("Test device", deviceID);
            call.resolve();
        } catch (Exception e) {
            Log.d("Label Error", e.getLocalizedMessage());
            call.reject(e.getLocalizedMessage());
        }
    }

    @PluginMethod
    public void discover(PluginCall call) throws ConnectionException {
        try {
            JSArray printers = implementation.discover();
            JSObject ret = new JSObject();
            ret.put("devices", printers);
            call.resolve(ret);
        } catch (ConnectionException e) {
            Log.d("Error", e.getLocalizedMessage());
            call.reject(e.getLocalizedMessage());
        } catch (Exception e) {
            Log.d("Error", e.getLocalizedMessage());
            call.reject(e.getLocalizedMessage());
        }
    }
}
