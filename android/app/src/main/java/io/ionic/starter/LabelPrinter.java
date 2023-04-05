package io.ionic.starter;

import android.app.PendingIntent;
import android.content.Intent;
import android.hardware.usb.UsbManager;
import com.getcapacitor.JSArray;
import com.zebra.sdk.comm.Connection;
import com.zebra.sdk.comm.ConnectionException;
import com.zebra.sdk.printer.discovery.*;

import java.nio.charset.StandardCharsets;
import java.util.LinkedList;
import java.util.List;

public class LabelPrinter {
    private UsbManager mUsbManager;
    private PendingIntent mPermissionIntent;
    private JSArray discoveredDevices;
    private static final String EPL_TEST_STRING = "\n" +
            "N\n" +
            "q801\n" +
            "Q329,026\n" +
            "ZT\n" +
            "B50,180,0,1,5,15,120,N,\"A.T.M\"\n" +
            "A35,30,0,2,2,2,N,\"Hello World\"\n" +
            "P1\n";
    private static final String ACTION_USB_PERMISSION = "com.android.example.USB_PERMISSION";

    LabelPrinter() {
        mUsbManager = (UsbManager) Globals.getActivity().getSystemService(Globals.getContext().USB_SERVICE);
        mPermissionIntent = PendingIntent.getBroadcast(Globals.getContext(), 0, new Intent(ACTION_USB_PERMISSION), 0);
    }

    JSArray discover() throws ConnectionException {
        discoveredDevices = new JSArray();
        setDiscoveredUsbDevices();
        return discoveredDevices;
    }

    void test(String deviceID) {
        write(deviceID, EPL_TEST_STRING);
    }

    void write(String deviceID, String rawString)  {
        printToUsbDevice(deviceID, rawString);
    }

    private Boolean printToUsbDevice(String deviceID, String rawString) {
        UsbDeviceDiscoveryHandler handler = new UsbDeviceDiscoveryHandler();
        UsbDiscoverer.findPrinters(Globals.getContext(), handler);
        try {
            while(!handler.discoveryComplete) {
                Thread.sleep(100);
            }
            if (handler.printers != null && handler.printers.size() > 0) {
                for(int i=0; i < handler.printers.size(); ++i) {
                    DiscoveredPrinterUsb discoveredPrinterUsb = handler.printers.get(i);
                    if (!mUsbManager.hasPermission(discoveredPrinterUsb.device)) {
                        mUsbManager.requestPermission(discoveredPrinterUsb.device, mPermissionIntent);
                    }
                    mUsbManager.requestPermission(discoveredPrinterUsb.device, mPermissionIntent);
                    if (deviceID.equals(handler.printers.get(i).device.getProductName())) {
                        Connection conn = handler.printers.get(i).getConnection();
                        conn.open();
                        conn.write(rawString.getBytes(StandardCharsets.UTF_8));
                        conn.close();
                        return true;
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Exception " + e.getLocalizedMessage());
        }
        return false;
    }

    private void setDiscoveredUsbDevices() {
        UsbDeviceDiscoveryHandler handler = new UsbDeviceDiscoveryHandler();
        UsbDiscoverer.findPrinters(Globals.getContext(), handler);
        try {
            while(!handler.discoveryComplete) {
                Thread.sleep(100);
            }
            if (handler.printers != null && handler.printers.size() > 0) {
                for(int i=0; i < handler.printers.size(); ++i) {
                    DiscoveredPrinterUsb discoveredPrinterUsb = handler.printers.get(i);
                    if (!mUsbManager.hasPermission(discoveredPrinterUsb.device)) {
                        mUsbManager.requestPermission(discoveredPrinterUsb.device, mPermissionIntent);
                    }
                    mUsbManager.requestPermission(discoveredPrinterUsb.device, mPermissionIntent);
                    discoveredDevices.put(discoveredPrinterUsb.device.getProductName());
                }
            }
        } catch (Exception e) {
            System.out.println("Exception " + e.getLocalizedMessage());
        }
    }

    private class UsbDeviceDiscoveryHandler implements DiscoveryHandler {
        public List<DiscoveredPrinterUsb> printers;
        public boolean discoveryComplete = false;

        UsbDeviceDiscoveryHandler() {
            printers = new LinkedList<>();
        }

        public void foundPrinter(final DiscoveredPrinter printer) {
            printers.add((DiscoveredPrinterUsb) printer);
        }

        public void discoveryFinished() {
            discoveryComplete = true;
        }

        public void discoveryError(String message) {
            discoveryComplete = true;
        }
    }
}
