package io.ionic.starter;

import android.content.Context;

public class GlobalContext {

    private Context context;

    public void setContext(Context context) {
        this.context = context;
    }

    public Context getContext() {
        return context;
    }
}
