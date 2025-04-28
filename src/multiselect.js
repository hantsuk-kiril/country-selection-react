import React from "react";
class Multiselect extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isOpen: false, searchTerm: '' };
      this.multiselectRef = null;
    }
  
    componentDidMount() {
      document.addEventListener('click', this.handleClickOutside);
    }
  
    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside);
    }
  
    handleClickOutside = (event) => {
      if (this.multiselectRef && !this.multiselectRef.contains(event.target)) {
        this.setState({ isOpen: false });
      }
    };
  
    toggleOption = (option) => {
      const { selectedOptions, onSelectionChange } = this.props;
      const isSelected = selectedOptions.some((selected) => selected.value === option.value);
      let newSelected = isSelected
        ? selectedOptions.filter((selected) => selected.value !== option.value)
        : [...selectedOptions, option];
      onSelectionChange(newSelected);
    };
  
    render() {
      const { options, selectedOptions, placeholder } = this.props;
      const { isOpen, searchTerm } = this.state;
      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      return (
        <div className="multiselect" ref={(el) => (this.multiselectRef = el)}>
          <div className="multiselect-input">
            {selectedOptions.map((option) => (
              <span key={option.value} className="selected-tag">
                {option.label}
                <button onClick={() => this.toggleOption(option)}>x</button>
              </span>
            ))}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => this.setState({ searchTerm: e.target.value })}
              onFocus={() => this.setState({ isOpen: true })}
              placeholder={selectedOptions.length === 0 && !isOpen ? placeholder : 'Search...'}
            />
          </div>
          {isOpen && (
            <div className="dropdown">
              {filteredOptions.length > 0 ? (
                <ul>
                  {filteredOptions.map((option) => (
                    <li key={option.value}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedOptions.some((selected) => selected.value === option.value)}
                          onChange={() => this.toggleOption(option)}
                        />
                        {option.label}
                      </label>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No options found</div>
              )}
            </div>
          )}
        </div>
      );
    }
  }

  export default Multiselect