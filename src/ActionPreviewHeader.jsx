import React, { Component } from 'react';

class ActionPreviewHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { tabs: this.getTabs(props.customTabs) };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.customTabs !== this.props.customTabs) {
      this.setState({ tabs: this.getTabs(props.customTabs) });
    }
  }

  getTabs(customTabs) {
    const tabs = ['Action', 'Diff', 'State'];
    if (customTabs) {
      customTabs.forEach(tab => {
        tabs.push(tab.name);
      });
    }
    return tabs;
  }

  render() {
    const {styling, inspectedPath, onInspectPath, tab, tabIdx, onSelectTab} = this.props;
    return (
      <div key='previewHeader' {...styling('previewHeader')}>
        <div {...styling('tabSelector')}>
          {this.state.tabs.map((t, i) =>
            <div onClick={() => onSelectTab(t, i)}
                 key={i}
              {...styling([
                'selectorButton',
                i === tabIdx && 'selectorButtonSelected'
              ], i === tabIdx)}>
              {t}
            </div>
          )}
        </div>
        <div {...styling('inspectedPath')}>
          {inspectedPath.length ?
            <span {...styling('inspectedPathKey')}>
              <a onClick={() => onInspectPath([])}
                {...styling('inspectedPathKeyLink')}>
                {tab}
              </a>
            </span> : tab
          }
          {inspectedPath.map((key, idx) =>
            idx === inspectedPath.length - 1 ? key :
              <span key={key}
                {...styling('inspectedPathKey')}>
              <a onClick={() => onInspectPath(inspectedPath.slice(0, idx + 1))}
                {...styling('inspectedPathKeyLink')}>
                {key}
              </a>
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default ActionPreviewHeader;