package com.junpark5786.todowidget;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class WidgetModule extends ReactContextBaseJavaModule {

    public WidgetModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "WidgetModule";
    }

    @ReactMethod
    public void updateWidget(String newText) {
        Context context = getReactApplicationContext();
        // Create an explicit intent to update the widget
        Intent intent = new Intent(context, com.junpark5786.todowidget.widget.MyWidgetProvider.class);
        intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
        
        // Retrieve all widget IDs for this provider
        int[] ids = AppWidgetManager.getInstance(context)
                        .getAppWidgetIds(new ComponentName(context, com.junpark5786.todowidget.widget.MyWidgetProvider.class));
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
        
        // Add the new text to the intent
        intent.putExtra("newText", newText);

        // Broadcast the update intent
        context.sendBroadcast(intent);
    }
}
