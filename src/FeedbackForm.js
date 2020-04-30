import PropTypes from "prop-types";
import React from "react";
import { Col, Row } from "react-flexbox-grid";
import { Button, FormGroup, FormText, Input, Label } from "reactstrap";

const FeedbackForm = ({ handleSubmit }) => (
  <div className="feedback-panel-stage-2 bg-primary">
    <form onSubmit={handleSubmit} className="mw-100">
      <ContainerInner className="no-padding-lrg">
        <Button className="btn-tab hide" type="button">
          Hide
        </Button>
        <Row className="border-bottom py-5 mb-3">
          <Col xs={12}>
            <h5 className="font-weight-bold">{`Help us Improve ${
              service.name
            } Discover my Benefits`}</h5>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <FormGroup tag="fieldset">
              <FormGroup check className="py-3">
                <Label check>
                  <Input
                    defaultChecked
                    type="radio"
                    data-id="suggestion"
                    name="radio1"
                    id="suggestion"
                    onChange={e => this.handleOptionChange(e)}
                  />
                  <p>There's missing or incorrect information on this page</p>
                </Label>
              </FormGroup>
              <FormGroup check className="py-3">
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    data-id="bug"
                    id="bug"
                    onChange={e => this.handleOptionChange(e)}
                  />
                  <p>I came across a technical bug or issue</p>
                </Label>
              </FormGroup>
              <FormGroup check className="py-3">
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    data-id="incorrect"
                    id="incorrect"
                    onChange={e => this.handleOptionChange(e)}
                  />
                  <p>I have another suggestion to do with this page</p>
                </Label>
              </FormGroup>
            </FormGroup>
          </Col>
          <Col lg={8}>
            {route === "suggestion" && (
              <FormGroup>
                <Label for="suggestionTextarea">
                  Tell us about what information is missing or incorrect on this
                  page
                </Label>
                <Input
                  onChange={e => this.handleChange(e)}
                  type="textarea"
                  name="suggestionTextarea"
                  data-route="suggestion"
                  id="suggestionTextarea"
                />
                <FormText className="text-white">
                  Missing information this needs to be hidden and shown only if
                  theres an error message!
                </FormText>
              </FormGroup>
            )}
            {route === "bug" && (
              <FormGroup>
                <Row>
                  <Col lg={6}>
                    <Label for="bugTextarea">What were you doing?</Label>
                    <Input
                      onChange={e => this.handleChange(e)}
                      type="textarea"
                      data-route="bug"
                      name="bugTextareaL"
                      id="bugTextareaL"
                    />
                    <FormText className="text-white">
                      Missing information this needs to be hidden and shown only
                      if theres an error message!
                    </FormText>
                  </Col>
                  <Col lg={6}>
                    <Label for="bugTextareaR">What went wrong?</Label>
                    <Input
                      onChange={e => this.handleChange(e)}
                      type="textarea"
                      data-route="bug"
                      name="bugTextareaR"
                      id="bugTextareaR"
                    />
                    <FormText className="text-white">
                      Missing information this needs to be hidden and shown only
                      if theres an error message!
                    </FormText>
                  </Col>
                </Row>
              </FormGroup>
            )}
            {route === "incorrect" && (
              <FormGroup>
                <Row>
                  <Col lg={12}>
                    <Label for="incorrectTextarea">
                      Tell us about your suggestion on this page so we can
                      improve the service
                    </Label>
                    <Input
                      onChange={e => this.handleChange(e)}
                      type="textarea"
                      data-route="incorrect"
                      name="incorrectTextarea"
                      id="incorrectTextarea"
                    />
                    <FormText className="text-white">
                      Missing information this needs to be hidden and shown only
                      if theres an error message!
                    </FormText>
                  </Col>
                </Row>
              </FormGroup>
            )}
            <FormGroup>
              <Row>
                <Col lg={6}>
                  <Button
                    type="submit"
                    className="btn-lg btn-block"
                    onClick={e => this.onSubmit(e)}
                  >
                    Send {feedbackStatus === "loading" && <LoadingSVG />}
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>
      </ContainerInner>
    </form>
  </div>
);
FeedbackForm.propTypes = {
  handleInitialFeedback: PropTypes.func.isRequired
};
export default FeedbackForm;

class ContainerInner extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div
        className={`container-inner ${
          this.props.class ? this.props.class : ""
        }`}
      >
        {children}
      </div>
    );
  }
}
