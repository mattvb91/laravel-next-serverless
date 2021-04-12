import { Row } from "react-styled-flexboxgrid";
import { InfoBox } from '../components/InfoBox/InfoBox';
import Layout from '../components/Layout';
import { internalAPIReq } from "./api/[...slug]";

/**
 * This page is an example using SSR while fetching data
 * from the api and then caching the page for 10 seconds in CDN.
 * 
 * Your could also use getStaticProps() instead 
 */
const Home = ({ frontend, backend }) => {

  return (
    <>
      <Row center="xs">
        <h2>Frontend Libs</h2>
      </Row>
      <Row>
        <p>Some of the frontend libs used in this starter kit.</p>
      </Row>
      <Row>
        {frontend.map((item, key) => <InfoBox {...item} key={key} />)}
      </Row>
      <Row center="xs">
        <h2>Backend Libs</h2>
      </Row>
      <Row>
        <p>Some of the main Backend (/api) (PHP) libs used.</p>
      </Row>
      <Row>
        {backend.map((item, key) => {
          //packagist returns a different format lets parse it quickly
          const props = item.packages[Object.keys(item["packages"])[0]];
          return (
            <InfoBox {...props[0]} key={key} />
          )
        })}
      </Row>
    </>
  )
}

Home.Layout = Layout;

export default Home;

export const getServerSideProps = async ({ req, res }) => {

  //We want to fetch internal api so we import the function
  //instead of another http request
  const summaryData = await internalAPIReq(req, res, "/api/summary");

  res.setHeader('Cache-Control', 'max-age=10, public')

  return {
    props: { ...summaryData }
  }
}