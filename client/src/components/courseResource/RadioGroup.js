import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


class RadioButtonsGroup extends React.Component {
  state = {
    value: ""
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
    this.props.setChoosenValue(event.target.value, this.props.index)
  };

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.options.includes(this.state.value)) {
  //     this.setState({ value: "" })
  //   }
  // }

  render() {
    return (
      <div>
        <FormControl>
          <RadioGroup
            value={this.state.value}
            onChange={this.handleChange}
          >
            {this.props.options.map((item, index) => {
              return (<FormControlLabel key={index} value={item} control={<Radio color="primary" />} label={item} />)
            })}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export default RadioButtonsGroup;