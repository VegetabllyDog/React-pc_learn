import {createGlobalStyle} from'styled-components';

export const IconStyle = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1605574274403'); /* IE9 */
  src: url('iconfont.eot?t=1605574274403#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('iconfont.woff?t=1605574274403') format('woff'),
  url('iconfont.ttf?t=1605574274403') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('iconfont.svg?t=1605574274403#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-icon--:before {
  content: "\e78c";
}

.icon-react:before {
  content: "\e64b";
}

.icon-html:before {
  content: "\e64f";
}

.icon-JS:before {
  content: "\e61a";
}

.icon-JS1:before {
  content: "\e651";
}

.icon-reactjs-line:before {
  content: "\e76d";
}

.icon-reactjs-fill:before {
  content: "\e6a9";
}

.icon-js:before {
  content: "\e6e3";
}

.icon-JS2:before {
  content: "\e614";
}

.icon-js1:before {
  content: "\e60e";
}

.icon-reactjs-fill1:before {
  content: "\eeae";
}

.icon-html1:before {
  content: "\e686";
}

.icon-react1:before {
  content: "\e600";
}

.icon-js2:before {
  content: "\e60d";
}
`
