package io.ionic.starter;

import android.content.Context;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    GlobalContext gc = new GlobalContext();
    gc.setContext(this.getApplicationContext());
    registerPlugin(LabelPrinter.class);
  }
}
