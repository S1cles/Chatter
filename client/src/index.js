import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Router';
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, extendTheme, theme } from '@chakra-ui/react';
import { mode } from "@chakra-ui/theme-tools";

const customTheme = extendTheme({
  colors: {
    brand: {
      500: "#ff6347",
    },
  },
  styles: {
    global: {
      ".chakra-tabs .chakra-tabs__tablist .chakra-tabs__tab[aria-selected='true']": {
        color: "cyan",
      },
      body: {
        bg: "#0a0412",
        color: "#f6aa35",
        tabsColor: 'aqua',
        border:'#f6aa35'
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={customTheme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

