/*eslint @typescript-eslint/no-unused-vars: ["off", {"varsIgnorePattern": "^_"}]*/
import React, {Component} from "react";
import {
  Query, Builder, Utils, 
  //types:
  ImmutableTree, Config, BuilderProps, JsonTree, JsonLogicTree
} from "react-awesome-query-builder";
import throttle from "lodash/throttle";
import { MenuItem, Select } from "@material-ui/core";
//import loadedConfig from "./config_simple"; // <- you can try './config' for more complex examples
//import loadedInitValue from "./init_value";
//import loadedInitLogic from "./init_logic";
//const stringify = JSON.stringify;
//const {queryBuilderFormat, jsonLogicFormat, queryString, mongodbFormat, sqlFormat, getTree, checkTree, loadTree, uuid, loadFromJsonLogic} = Utils;
//const preStyle = { backgroundColor: "darkgrey", margin: "10px", padding: "10px" };
//const preErrorStyle = { backgroundColor: "lightpink", margin: "10px", padding: "10px" };

//const emptyInitValue: JsonTree = {"id": uuid(), "type": "group"};

// get init value in JsonTree format:
//const initValue: JsonTree = loadedInitValue && Object.keys(loadedInitValue).length > 0 ? loadedInitValue as JsonTree : emptyInitValue;
//const initTree: ImmutableTree = checkTree(loadTree(initValue), loadedConfig);

// -OR- alternativaly get init value in JsonLogic format:
//const initLogic: JsonLogicTree = loadedInitLogic && Object.keys(loadedInitLogic).length > 0 ? loadedInitLogic : undefined;
//const initTree: ImmutableTree = checkTree(loadFromJsonLogic(initLogic, loadedConfig), loadedConfig);


interface DemoQueryBuilderState {
  tree: ImmutableTree;
  config: Config;
  operator: string
}

//const [operator, setOperator] = React.useState(''); 

export default class DemoQueryBuilder extends React.Component<DemoQueryBuilderState> {
    private immutableTree: ImmutableTree;
    private config: Config;
    public operator: string;
    
    state = {
      tree: this.props.tree,
      config: this.props.config,
      operator: this.props.operator
    };

    render = () => (
      <div>
        <Query 
          {...this.props.config} 
          value={this.state.tree}
          onChange={this.onChange}
          renderBuilder={this.renderBuilder}
        />
        <Select
          labelId="selector"
          id="selector"
          onChange={this.onSelectorChange}    
        >   
          <MenuItem value="">
            <em>None</em>
          </MenuItem>   
          <MenuItem value={"and"}>And</MenuItem>
          <MenuItem value={"or"}>Or</MenuItem>
        </Select>

      </div>
    )
/*
    resetValue = () => {
      this.setState({
        tree: initTree, 
      });
    };

    clearValue = () => {
      this.setState({
        tree: loadTree(emptyInitValue), 
      });
    };
*/
    renderBuilder = (props: BuilderProps) => (
      <div className="query-builder-container" style={{padding: "10px"}}>
        <div className="query-builder qb-lite">
          <Builder {...props} />
        </div>
      </div>
    )
    
    onChange = (immutableTree: ImmutableTree, config: Config) => {
      this.immutableTree = immutableTree;
      this.config = config;
      this.updateResult();

      // `jsonTree` or `logic` can be saved to backend
      // (and then loaded with `loadTree` or `loadFromJsonLogic` as seen above)
      //const jsonTree = getTree(immutableTree);
      //const {logic, data, errors} = jsonLogicFormat(immutableTree, config);
    }

    onSelectorChange = (event) => {
      this.operator = event.target.value;
      this.setState({tree: this.immutableTree, config: this.config, operator: this.operator})
    };
 
    updateResult = throttle(() => {
      this.setState({tree: this.immutableTree, config: this.config, operator: this.operator});
    }, 100)

    

}
