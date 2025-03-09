package com.junpark5786.todowidget.widget;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;
import com.junpark5786.todowidget.R;

public class MyWidgetProvider extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // Loop through each widget instance
        for (int widgetId : appWidgetIds) {
            // Inflate the widget layout with the new keyword
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_layout);
            // Set default text (if desired)
            // views.setTextViewText(R.id.widget_text, "Default Text");
            // Update the widget
            appWidgetManager.updateAppWidget(widgetId, views);
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        
        if (AppWidgetManager.ACTION_APPWIDGET_UPDATE.equals(intent.getAction())) {
            // Retrieve the new text passed via the intent, if any
            String newText = intent.getStringExtra("newText");
            if (newText != null) {
                AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
                // Instantiate ComponentName using new keyword
                ComponentName thisWidget = new ComponentName(context, MyWidgetProvider.class);
                int[] allWidgetIds = appWidgetManager.getAppWidgetIds(thisWidget);
                for (int widgetId : allWidgetIds) {
                    // Instantiate RemoteViews with new keyword
                    RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_layout);
                    views.setTextViewText(R.id.widget_text, newText);
                    appWidgetManager.updateAppWidget(widgetId, views);
                }
            }
        }
    }
}
