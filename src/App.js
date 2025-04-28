import Multiselect from "./multiselect";
import timezones from "./timezones";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedOptions: [] };
  }

  handleSelectionChange = (newSelectedOptions) => {
    this.setState({ selectedOptions: newSelectedOptions });
  };

  render() {
    const options = timezones.map((tz) => ({ label: tz, value: tz }));
    return (
      <div>
        <h1 id="Title">Multiselect Example</h1>
        <Multiselect
          options={options}
          selectedOptions={this.state.selectedOptions}
          onSelectionChange={this.handleSelectionChange}
          placeholder="Select timezones"
        />
      </div>
    );
  }
}

export default App
