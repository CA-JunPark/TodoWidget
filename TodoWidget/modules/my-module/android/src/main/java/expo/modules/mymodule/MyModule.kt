package expo.modules.mymodule

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.os.Build
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL

class MyModule : Module() {

    private val contrxt 
        get() = requireNotNull(appContext.reactContext)

    private val activity
        get() = requireNotNull(appContext.activityProvider?.currentActivity)

    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    override fun definition() = ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('MyModule')` in JavaScript.
        Name("MyModule")

        // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
        Constants(
            "PI" to Math.PI
        )

        // Defines event names that the module can send to JavaScript.
        Events("onChange")

        // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
        Function("hello") {
            "Hello world! 👋"
        }


        // Defines a JavaScript function that always returns a Promise and whose native code
        // is by default dispatched on the different thread than the JavaScript runtime runs on.
        AsyncFunction("setValueAsync") { value: String ->
            // Send an event to JavaScript.
            sendEvent("onChange", mapOf(
                "value" to value
            ))
        }

        // Enables the module to be used as a native view. Definition components that are accepted as part of
        // the view definition: Prop, Events.
        View(MyModuleView::class) {
            // Defines a setter for the `url` prop.
            Prop("url") { view: MyModuleView, url: URL ->
                view.webView.loadUrl(url.toString())
            }
            // Defines an event that the view can send to JavaScript.
            Events("onLoad")
        }

        Function("createWidget") {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                val appWidgetManager = AppWidgetManager.getInstance(activity)
                val provider = ComponentName(activity, MyAppWidgetReceiver::class.java)
                if (appWidgetManager.isRequestPinAppWidgetSupported) {
                    val launchIntent = activity.packageManager.getLaunchIntentForPackage(activity.packageName)
                    val successCallback = launchIntent?.let {
                        PendingIntent.getBroadcast(
                            activity, 0, it,
                            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_MUTABLE
                        )
                    }
                    appWidgetManager.requestPinAppWidget(provider, null, successCallback)
                }
            }
        }
    }
}