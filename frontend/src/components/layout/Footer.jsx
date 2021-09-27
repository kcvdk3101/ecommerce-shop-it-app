import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

const socials = [
  {
    icon: <ion-icon name="logo-facebook"></ion-icon>,
    path: "https://www.facebook.com/",
  },
  {
    icon: <ion-icon name="logo-instagram"></ion-icon>,
    path: "https://www.instagram.com/",
  },
  {
    icon: <ion-icon name="logo-github"></ion-icon>,
    path: "https://www.github.com/",
  },
  {
    icon: <ion-icon name="logo-google"></ion-icon>,
    path: "https://www.google.com/",
  },
  {
    icon: <ion-icon name="logo-twitter"></ion-icon>,
    path: "https://www.twitter.com/",
  },
];

const links = [
  {
    text: "Phone",
    path: "/phone",
  },
  {
    text: "Laptop",
    path: "/laptop",
  },
  {
    text: "Tablet",
    path: "/tablet",
  },
  {
    text: "Watch",
    path: "/watch",
  },
  {
    text: "Headphone",
    path: "/headphone",
  },
];

const Footer = () => {
  return (
    <footer className="py-5">
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <Link to="/">
              <img
                className="mb-4"
                src="/images/logo_footer.png"
                alt="Logo"
                width="300"
              />
            </Link>
            <p className="text-justify text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Architecto ad fugit voluptatibus, iure fugiat quisquam cupiditate
              minus nulla earum cumque quaerat harum dolores ut quasi corporis
              voluptas molestiae nesciunt dolorem.
            </p>
          </Col>
          <Col xs={12} md={4}>
            <Row>
              <Col>
                <h5 className="text-warning">Our Products</h5>
                <div className="line"></div>
                {links.map((link, index) => (
                  <a key={index} href={link.path} className="text-white">
                    <p>{link.text}</p>
                  </a>
                ))}
              </Col>
              <Col>
                <h5 className="text-warning">Our Products</h5>
                <div className="line"></div>
                {links.map((link, index) => (
                  <a key={index} href={link.path} className="text-white">
                    <p>{link.text}</p>
                  </a>
                ))}
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={4}>
            <form>
              <Row>
                <Col xs={12}>
                  <h5 className="text-warning">Sign up for our newsletter</h5>
                </Col>
              </Row>
              <Row className="my-3">
                <Col xs={12} md={7}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                    />
                  </div>
                </Col>
                <Col
                  xs={12}
                  md={5}
                  className="d-flex justify-content-center align-items-end"
                >
                  <button type="submit" className="btn btn-outline-light">
                    Subscribe
                  </button>
                </Col>
              </Row>
              <Row>
                <Col className="my-2">
                  {socials.map((s, i) => (
                    <a
                      key={i}
                      className="link_social btn mr-3 text-white"
                      href={s.path}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {s.icon}
                    </a>
                  ))}
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
        <div className="text-center p-3 text-warning">© Shopping Cart 2020</div>
      </Container>
    </footer>
  );
};

export default Footer;
