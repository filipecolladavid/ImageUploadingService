import { Col, Card } from "react-bootstrap";

const ImgCard = ({ img }) => {
  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={img.src} style={{height:"14rem"}}/>
        <Card.Body>
          <Card.Title>{img.title}</Card.Title>
          <Card.Text>
            {img.desc}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ImgCard;