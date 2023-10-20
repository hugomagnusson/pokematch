import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import DoubleRangeSlider from "./DoubleRangeSlider";
import useSettingsContext from "./useSettingsContext";

const MIN = 1;
const MAX = 8;

function Settings() {
  const { state, actions } = useSettingsContext();

  console.log("max GENNN " + state.maxGen);
  const [values, setValues] = useState({
    minGen: state.minGen,
    maxGen: state.maxGen,
  });
  const [oldSpritesEnabled, setOldSpritesEnabled] = useState(state.oldSprites);
  const [saveEnabled, setSaveEnabled] = useState(true);

  useEffect(() => {
    if (
      values.minGen === state.minGen &&
      values.maxGen === state.maxGen &&
      oldSpritesEnabled === state.oldSprites
    ) {
      setSaveEnabled(false);
    } else {
      setSaveEnabled(true);
    }
  }, [values, oldSpritesEnabled, state]);

  const handleLightModeChange = () => {
    setOldSpritesEnabled(!oldSpritesEnabled);
  };

  const handleSaveSettings = () => {
    actions.setGensSave({ minGen: values.minGen, maxGen: values.maxGen });
    actions.setOldSpritesSave(oldSpritesEnabled);
    setSaveEnabled(false);
  };

  const setValuesFormat = (val) => {
    setValues({ minGen: val[0], maxGen: val[1] });
  };

  return (
    <Container>
      <h1 className="text-center font-erica-one mt-2">Settings</h1>
      <DoubleRangeSlider
        setValuesLOL={setValuesFormat}
        defaultValues={[values.minGen, values.maxGen]}
        min={MIN}
        max={MAX}
      />
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm={1}>
            I'm old
          </Form.Label>
          <Col sm={3}>
            <Form.Check
              type="switch"
              id="lightModeSwitch"
              label={oldSpritesEnabled ? "On" : "Off"}
              checked={oldSpritesEnabled}
              onChange={handleLightModeChange}
            />
          </Col>
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleSaveSettings}
          disabled={!saveEnabled}
        >
          Save Settings
        </Button>
      </Form>
    </Container>
  );
}

export default Settings;
