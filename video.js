import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';

const renderers = {
  iframe: IframeRenderer
};

const customHTMLElementModels = {
  iframe: iframeModel
};

// ...

<RenderHTML
  renderers={renderers}
  WebView={WebView}
  source={{ html: '<iframe ...></iframe>' }}
  customHTMLElementModels={customHTMLElementModels}
  defaultWebViewProps={
    {
      /* Any prop you want to pass to all WebViews */
    }
  }
  renderersProps={{
    iframe: {
      scalesPageToFit: true,
      webViewProps: {
        /* Any prop you want to pass to iframe WebViews */
      }
    }
  }}
/>;