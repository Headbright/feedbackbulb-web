import SimpleFeedbackForm from "./components/SimpleFeedbackForm";

function FbbFeedback({ appKey, direction, options }) {
  return (
    <SimpleFeedbackForm
      appKey={appKey}
      direction={direction}
      options={options}
    />
  );
}

export default FbbFeedback;
