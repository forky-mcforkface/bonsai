/*
 * @flow
 */

import React, { Component } from 'react';

type JSONCallback = (fileName: string, json: Object) => void;

type Props = {
  id?: string,
  className?: string,
  onLoading: () => void,
  onChange: JSONCallback,
};
type State = {
  dataFiles: Array<string>,
};

function fetchJSON(file: string, callback: JSONCallback) {
  fetch(file).then((response) => {
    return response.json();
  }).then((json) => {
    callback(file, json);
  }).catch((error) => {
    console.log('Failed to fetch existing stats files');
  });
}

export default class JsonFilePicker extends Component<void, Props, State> {
  state: State = {
    dataFiles: [],
  };

  componentDidMount() {
    fetchJSON('/data/index.json', (fileName, json) => {
      this.setState({
        dataFiles: json.files,
      });
    });
  }

  render() {
    return (
      <select
        id={this.props.id}
        className={this.props.className}
        onChange={this.onChange}>
        <option value=""></option>
        {this.state.dataFiles.map((file) =>
          <option key={file} value={file}>{file}</option>
        )}
      </select>
    );
  }

  onChange = (event: SyntheticInputEvent) => {
    if (event.target.value) {
      this.props.onLoading();
      fetchJSON(String(event.target.value), (fileName, json) => {
        this.props.onChange(fileName, json);
      });
    }
  };

}