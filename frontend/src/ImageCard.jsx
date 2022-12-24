import { Col, Card } from "react-bootstrap"

const ImageCard = ({ image, handleSelect }) => {
  return (
    <Col>
      <Card onClick={() => handleSelect(image._id)}>
        <Card.Img variant="top" src={image.src} style={{ height: "14rem" }} />
        <Card.Body>
          <Card.Title>{image.title}</Card.Title>
          <Card.Text>
            {image.desc}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ImageCard;