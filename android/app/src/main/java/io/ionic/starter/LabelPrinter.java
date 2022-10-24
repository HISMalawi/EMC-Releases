package io.ionic.starter;

import android.content.Context;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "LabelPrinter")
public class LabelPrinter extends Plugin {

    private Context context;

    public LabelPrinter (Context context) {
        this.context = context;
    }

    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value + " from plugin");
        call.resolve(ret);
    }
}
