import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { apiFetchAllContacts } from "../data/contacts";
import AddContacts from "./AddContacts";
import DisplayContacts from "./DisplayContacts";

interface HomePageProps {}

interface HomePageState {
  data: any;
  loading: boolean;
}

export default class HomePage extends Component<HomePageProps, HomePageState> {
  state: HomePageState = {
    data: null,
    loading: true,
  };

  async componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const response = await apiFetchAllContacts();

    this.setState({ data: response, loading: false }, () => {
      // console.log(this.state.data, "data");
    });
  }

  render() {
    const { loading, data } = this.state;
    return (
      <>
        <h1 className="home">Contacts Manager</h1>
        <Container fluid>
          <Row>
            <Col md={5}>
              <AddContacts onAddContact={() => this.fetchData()} />
            </Col>
            <Col md={7}>
              {loading ? (
                <div>...Loading</div>
              ) : (
                <>
                  <DisplayContacts
                    onAddContact={() => this.fetchData()}
                    data={data}
                  />
                </>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
