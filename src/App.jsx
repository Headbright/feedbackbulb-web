import { useState } from "react";

import SimpleFeedbackForm from "./components/SimpleFeedbackForm";

function App({ appKey, direction, options }) {
  return (
    <div className="fbb-widgets">
      <SimpleFeedbackForm
        appKey={appKey}
        direction={direction}
        options={options}
      />
    </div>
  );
}

export default App;
