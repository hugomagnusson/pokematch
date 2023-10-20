import { useEffect, useState } from "react";
import { Form, Row, Col, Range } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

export default function DoubleRangeSlider(props) {
  const MIN = props.min;
  const MAX = props.max;


  const [values, setValues] = useState([
    props.defaultValues[0],
    props.defaultValues[1],
  ]);

  useEffect(() => {
    props.setValuesLOL(values);
  }, [values]);

  const setMinValue = (event) => {
    const val = event.target.value;
    const maxVal = values[1];
    if (val > maxVal) {
      setValues([val, val]);
    } else {
      setValues([val, maxVal]);
    }
  };

  const setMaxValue = (event) => {
    const val = event.target.value;
    const minVal = values[0];
    if (val < minVal) {
      setValues([val, val]);
    } else {
      setValues([minVal, val]);
    }
  };

  return (
    <Form>
      <Form.Group as={Row}>
        <Col xs="9">
          <Form.Label>Min generation</Form.Label>
          <RangeSlider
            value={values[0]}
            onChange={setMinValue}
            step={1}
            min={MIN}
            max={MAX}
            tooltip="on"
          />
          <Form.Label>Max generation</Form.Label>
          <RangeSlider
            value={values[1]}
            onChange={setMaxValue}
            step={1}
            min={MIN}
            max={MAX}
            tooltip="on"
          />
        </Col>
        <Col xs="3"></Col>
      </Form.Group>
    </Form>
  );
}
