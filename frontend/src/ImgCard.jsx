import { Col, Card } from "react-bootstrap";

const ImgCard = ({ img }) => {
  return (
    <Col>
      <Card style={{ width: "100px" }}>
        <Card.Img variant="top" src={img.src} />
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