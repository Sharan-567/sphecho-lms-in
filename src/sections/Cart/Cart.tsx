import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../store";
import { AiOutlineUser } from "react-icons/ai";
import { HOST } from "../../features/settings";
import { removeItem } from "../../features/cart";

const Cart = () => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const getPrice = (price?: string) => {
    if (price) {
      if (parseInt(price) == 0) return "Free";
      else return `$${parseInt(price)}`;
    }
  };

  return (
    <Container className="p-5">
      <div className="bg-gray br-2 p-5">
        <h3 className="b-700 text-blue">Cart</h3>
        {items.length === 0 ? (
          <p>Cart is Empty</p>
        ) : (
          <div className="p-3">
            {items.map((item) => (
              <div>
                <Row className="p-3 br-1 bg-graydark mb-3">
                  <Col sm={2}>
                    <div className="round">
                      <img
                        className=" p-1"
                        style={{
                          height: "5rem",
                          objectFit: "cover",
                        }}
                        src={`https://${HOST}${item.info_image}`}
                      />
                    </div>
                  </Col>
                  <Col sm={8}>
                    <h5 className="mb-3 mt-3">{item.name}</h5>
                    <div
                      className="d-flex align-items-center"
                      style={{ marginTop: "-.8rem" }}
                    >
                      <AiOutlineUser className="mb-3 me-1" size={"1.2rem"} />
                      <p className="small b-600 w-100">{item?.trainer_name}</p>
                    </div>
                  </Col>
                  <Col sm={2}>
                    <h4 className="text-skyBlue">
                      {getPrice(item?.full_amount)}
                    </h4>
                    <Button
                      onClick={() => dispatch(removeItem(item.id))}
                      variant="green"
                      className="text-white"
                      style={{ fontSize: ".8rem" }}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Cart;
