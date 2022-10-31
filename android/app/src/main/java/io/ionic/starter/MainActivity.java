package io.ionic.starter;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    Globals.setActivity(this);
    Globals.setContext(this.getApplicationContext());
    registerPlugin(LabelPrinterPlugin.class);
  }
}
