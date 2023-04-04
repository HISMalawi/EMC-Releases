package io.ionic.starter;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    Globals.setActivity(this);
    Globals.setContext(this.getApplicationContext());
    registerPlugin(LabelPrinterPlugin.class);
    super.onCreate(savedInstanceState);
  }
}
