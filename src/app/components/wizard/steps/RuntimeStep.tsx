import * as React from 'react';

import './RuntimeStep.css';
import Wizard from '@shared/components/wizard';
import Runtime from '@app/models/Runtime';
import { StepProps } from '@shared/smart-components/smart-wizard/StepProps';
import ListSingleSelection from '@shared/components/selection/ListSingleSelection';
import SectionLoader from '@shared/components/loader/SectionLoader';
import { FetchedData } from '@app/models/FetchedData';

export interface RuntimeStepContext {
  runtime?: Runtime;
}

interface RuntimeStepProps extends StepProps<RuntimeStepContext> {
  runtimesData: FetchedData<Runtime[]>;
  fetchRuntimes: () => {};
}

class RuntimeStep extends React.Component<RuntimeStepProps, {}> {
  public static defaultProps = {
    context: {},
  };

  public componentDidMount() {
    this.props.fetchRuntimes();
  }

  public render() {
    const {context, runtimesData, updateStepContext} = this.props;
    const summary = context.runtime && `➡️ Your future application will use «${context.runtime.name}»`;
    const onSelect = (runtime: Runtime) => updateStepContext({completed: true, context: {runtime}});
    const submit = () => this.props.submit();
    return (
      <Wizard.Step
        title={'Language & Runtime'}
        summary={summary}
        onClick={this.props.select}
        {...this.props.status}
      >
        <SectionLoader loading={runtimesData.loading} error={runtimesData.error} reload={this.props.fetchRuntimes}>
          <ListSingleSelection items={runtimesData.data} onSelect={onSelect} selectedItem={context.runtime}>
            Here you can choose a runtime for a specific programming language
          </ListSingleSelection>
        </SectionLoader>
        <Wizard.StepFooter>
          <Wizard.Button type={'next'} disabled={!this.props.status.completed} onClick={submit}/>
        </Wizard.StepFooter>
      </Wizard.Step>
    );
  }
}

export default RuntimeStep;
