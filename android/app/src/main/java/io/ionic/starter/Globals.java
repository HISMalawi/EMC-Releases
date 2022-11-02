package io.ionic.starter;

import android.content.Context;

import androidx.appcompat.app.AppCompatActivity;

public class Globals {

    private static Context context;

    private static AppCompatActivity activity;

    public static void setContext(Context contextf) {
        context = contextf;
    }

    public static void setActivity(AppCompatActivity activity) {
        Globals.activity = activity;
    }

    public static AppCompatActivity getActivity() {
        return activity;
    }

    public static Context getContext() {
        return context;
    }
}
