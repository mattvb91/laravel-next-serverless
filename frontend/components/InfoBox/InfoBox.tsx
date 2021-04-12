import { Col, Row } from "react-styled-flexboxgrid"
import styled from "styled-components"

const StyledInfoBox = styled(Col)`
    padding-left: 20px;
    padding-right: 20px;
    margin-right: 10px;
    margin-top: 10px;
    border: 1px solid lightgray;
    box-shadow: 0px 0px 10px #f1f1f1;
    border-radius: 5px;

    h3 {
        padding-top: 10px;
        font-size: 25px;
        font-weight: bold;
        padding-bottom: 10px;
    }

    p {
        padding-top: 20px;
        padding-bottom: 20px;
    }
`

export const InfoBox = ({ name, version, homepage, description }) => {
    return (
        <StyledInfoBox data-cy="info-box" lg={4} sm={6} xs={12}>
            <Row>
                <h3>
                    {name}
                </h3>
            </Row>
            <Row>
                Latest Version: {version}
            </Row>
            <Row>
                <a target="_blank" href={homepage}>{homepage}</a>
            </Row>
            <Row>
                <p>
                    {description}
                </p>
            </Row>
        </StyledInfoBox>
    )
}