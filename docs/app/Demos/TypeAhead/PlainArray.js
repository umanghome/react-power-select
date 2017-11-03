import React, { Component } from 'react';
import { TypeAhead, TypeAheadSelectTrigger } from 'src';
import { frameworks } from '../constants';

// Youtube-like Select Trigger achieved via composition
class YoutubeKindaTypeAheadTrigger extends Component {
  state = {};

  componentWillMount() {
    this.setState({ searchTerm: this.props.searchTerm });
  }

  componentWillReceiveProps(nextProps) {
    let { searchTerm, highlightedOption } = this.props;
    let { searchTerm: newSearchTerm, highlightedOption: newHighlightedOption } = nextProps;
    if (newSearchTerm === searchTerm && newHighlightedOption !== highlightedOption) {
      newSearchTerm = this.getValueFromOption(nextProps, newHighlightedOption);
    }
    this.setState({ searchTerm: newSearchTerm });
  }

  getValueFromOption(props = this.props, option) {
    let { selectedOptionLabelPath, optionLabelPath } = props;
    let value = '';
    selectedOptionLabelPath = selectedOptionLabelPath || optionLabelPath;
    if (option) {
      if (typeof option === 'string') {
        value = option;
      } else if (selectedOptionLabelPath) {
        value = option[selectedOptionLabelPath];
      }
    }
    return value;
  }

  render() {
    let { searchTerm, ...rest } = this.props;
    return <TypeAheadSelectTrigger searchTerm={this.state.searchTerm} {...rest} />;
  }
}

// Good to have Wrapper Component. Otherwise, you'd need to pass `triggerComponent={YoutubeKindaTypeAheadTrigger}` on the consumption end
const YoutubeTypeAhead = props => {
  return <TypeAhead triggerComponent={YoutubeKindaTypeAheadTrigger} {...props} />;
};

export default class PlainArrayDemo extends Component {
  state = {
    selectedFramework: 'React',
  };

  handleChange = ({ option }) => {
    this.setState({ selectedFramework: option });
  };

  render() {
    return (
      <div>
        <div className="demo">
          <h3>Plain Array</h3>
          <YoutubeTypeAhead
            options={frameworks}
            selected={this.state.selectedFramework}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
