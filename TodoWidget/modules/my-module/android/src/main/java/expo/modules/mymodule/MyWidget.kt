package expo.modules.mymodule

import android.appwidget.AppWidgetManager
import android.content.Context
import android.widget.RemoteViews
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.glance.GlanceId
import androidx.glance.GlanceModifier
import androidx.glance.GlanceTheme
import androidx.glance.LocalSize
import androidx.glance.action.actionStartActivity
import androidx.glance.action.clickable
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.SizeMode
import androidx.glance.appwidget.provideContent
import androidx.glance.background
import androidx.glance.layout.Box
import androidx.glance.layout.padding
import androidx.glance.text.FontWeight
import androidx.glance.text.Text
import androidx.glance.text.TextStyle
import androidx.glance.unit.ColorProvider

class MyWidget : GlanceAppWidget() {
    // errorUiLayout = R.layout.custom_error_layout
    
    override val sizeMode: SizeMode = SizeMode.Exact

    override suspend fun provideGlance(context: Context, id: GlanceId) {
        provideContent {
            GlanceTheme {
                val size = LocalSize.current
                Box(
                    modifier = GlanceModifier
                        .background(color = Color.Red)
                        .padding(30.dp)
                ) {
                    Text(
                        text = "Hello Widgets ${size.width}",
                        style = TextStyle(
                            color = ColorProvider(
                                Color(0xFF000000)
                            ),
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Medium
                        )
                    )
                }
            }
        }
    }


    override fun onCompositionError(
        context: Context,
        glanceId: GlanceId,
        appWidgetId: Int,
        throwable: Throwable
    ) {
        super.onCompositionError(context, glanceId, appWidgetId, throwable)
        val remoteView = RemoteViews(context.packageName, R.layout.custom_error_layout)
        remoteView.setTextViewText(R.id.textView, "Error")
        AppWidgetManager.getInstance(context).updateAppWidget(appWidgetId, remoteView)
    }
}