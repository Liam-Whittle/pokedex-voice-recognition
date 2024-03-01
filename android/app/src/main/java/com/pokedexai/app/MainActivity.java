package com.pokedexai.app;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    WebView v = getBridge().getWebView();
    v.setOverScrollMode(v.OVER_SCROLL_NEVER);
}

