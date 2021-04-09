import reset from 'react-style-reset/string';
import { Col, Grid, Row } from 'react-styled-flexboxgrid';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useAuth } from "../contexts/auth";
import { Header } from "./Header/Header";


const GlobalStyle = createGlobalStyle`
 ${reset};

html,
body {
  padding: 0;
  margin: 0;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    height:100%;
}

body {
    line-height: 1.6;
    overflow-y: scroll;
  }


#__next {
      height:100%;
      display: flex;
      flex-direction: column;
    }


a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
`

const theme = {
    flexboxgrid: {
        // Defaults
        gridSize: 12, // columns
        gutterWidth:1, // rem
        outerMargin: 0, // rem
        mediaQuery: 'only screen',
        container: {
            sm: 44, // rem
            md: 59, // rem
            lg: 70  // rem
        },
        breakpoints: {
            xs: 0,  // em
            sm: 48, // em
            md: 64, // em
            lg: 75  // em
        }
    },
    colors: {
        primary: '#0070f3',
    },
}
export default function Layout({ children }) {
    const auth = useAuth()

    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Grid>
                    <Col sm={12}>
                        <Header auth={auth}></Header>
                        {children}
                    </Col>
                </Grid>
            </ThemeProvider>
        </>
    )
}
