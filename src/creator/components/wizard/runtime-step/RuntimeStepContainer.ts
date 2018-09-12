import { connect } from 'react-redux';
import { AppState, WizardStepId } from '../../../states';
import RuntimeStep from './RuntimeStep';
import { wizardAction } from '../../../actions';

const mapStateToProps = (state: AppState) => ({
  selectedRuntime: state.wizard.runtimeStep.runtime,
  valid: state.wizard.runtimeStep.valid,
  current: state.wizard.current === WizardStepId.RUNTIME_STEP,
  locked: !state.wizard.titleStep.valid,
});

const mapDispatchToProps = (dispatch) => ({
  goToNextStep: () => dispatch(wizardAction.goToStep(WizardStepId.CAPABILITIES_STEP)),
});

const RuntimeStepContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RuntimeStep);

export default RuntimeStepContainer;