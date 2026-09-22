package com.example

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.view.ViewGroup
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {

    private var webView: WebView? = null
    private var filePathCallback: ValueCallback<Array<Uri>>? = null

    private val filePickerLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (filePathCallback != null) {
            val results: Array<Uri>? = if (result.resultCode == RESULT_OK) {
                result.data?.data?.let { arrayOf(it) }
                    ?: result.data?.clipData?.let { clipData ->
                        Array(clipData.itemCount) { i -> clipData.getItemAt(i).uri }
                    }
            } else {
                null
            }
            filePathCallback?.onReceiveValue(results)
            filePathCallback = null
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView?.canGoBack() == true) {
                    webView?.goBack()
                } else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        })

        setContent {
            MyApplicationTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    ShopBDWebViewScreen(
                        onWebViewCreated = { webView = it },
                        onOpenFileChooser = { callback, intent ->
                            filePathCallback = callback
                            try {
                                filePickerLauncher.launch(intent)
                            } catch (e: Exception) {
                                callback.onReceiveValue(null)
                                filePathCallback = null
                            }
                        }
                    )
                }
            }
        }
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun ShopBDWebViewScreen(
    onWebViewCreated: (WebView) -> Unit,
    onOpenFileChooser: (ValueCallback<Array<Uri>>, Intent) -> Unit
) {
    var progress by remember { mutableFloatStateOf(0f) }
    var isLoading by remember { mutableStateOf(true) }

    Box(modifier = Modifier.fillMaxSize().statusBarsPadding()) {
        AndroidView(
            factory = { context ->
                WebView(context).apply {
                    layoutParams = ViewGroup.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT
                    )

                    settings.apply {
                        javaScriptEnabled = true
                        domStorageEnabled = true
                        databaseEnabled = true
                        loadWithOverviewMode = true
                        useWideViewPort = true
                        allowFileAccess = true
                        allowContentAccess = true
                        cacheMode = WebSettings.LOAD_DEFAULT
                        mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                    }

                    webChromeClient = object : WebChromeClient() {
                        override fun onProgressChanged(view: WebView?, newProgress: Int) {
                            progress = newProgress / 100f
                            isLoading = newProgress < 100
                        }

                        override fun onShowFileChooser(
                            webView: WebView?,
                            filePathCallback: ValueCallback<Array<Uri>>?,
                            fileChooserParams: FileChooserParams?
                        ): Boolean {
                            if (filePathCallback == null) return false
                            val intent = fileChooserParams?.createIntent() ?: Intent(Intent.ACTION_GET_CONTENT).apply {
                                type = "image/*"
                                addCategory(Intent.CATEGORY_OPENABLE)
                            }
                            onOpenFileChooser(filePathCallback, intent)
                            return true
                        }
                    }

                    webViewClient = object : WebViewClient() {
                        override fun shouldOverrideUrlLoading(
                            view: WebView?,
                            request: WebResourceRequest?
                        ): Boolean {
                            val url = request?.url?.toString() ?: return false
                            if (url.startsWith("file://") || url.startsWith("http://localhost")) {
                                return false
                            }
                            if (url.startsWith("tel:") || url.startsWith("mailto:") || url.startsWith("whatsapp:") || url.startsWith("https://wa.me/")) {
                                try {
                                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                                    context.startActivity(intent)
                                    return true
                                } catch (e: Exception) {
                                    return false
                                }
                            }
                            return false
                        }

                        override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                            isLoading = true
                        }

                        override fun onPageFinished(view: WebView?, url: String?) {
                            isLoading = false
                        }
                    }

                    loadUrl("file:///android_asset/web/index.html")
                    onWebViewCreated(this)
                }
            },
            modifier = Modifier.fillMaxSize()
        )

        if (isLoading) {
            LinearProgressIndicator(
                progress = { progress },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(3.dp),
                color = Color(0xFFD97706),
                trackColor = Color(0xFF1E293B)
            )
        }
    }
}

