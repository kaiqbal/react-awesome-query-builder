/*eslint @typescript-eslint/no-unused-vars: ["off", {"varsIgnorePattern": "^_"}]*/
import React, {Component} from "react";
import {
  Query, Builder, Utils, 
  //types:
  ImmutableTree, Config, BuilderProps, JsonTree, JsonLogicTree
} from "react-awesome-query-builder";
import throttle from "lodash/throttle";
import { MenuItem, Select } from "@material-ui/core";
const stringify = JSON.stringify;
//import loadedConfig from "./config_simple"; // <- you can try './config' for more complex examples
//import loadedInitValue from "./init_value";
//import loadedInitLogic from "./init_logic";
//const stringify = JSON.stringify;
const {queryBuilderFormat, jsonLogicFormat, queryString, mongodbFormat, sqlFormat, getTree, checkTree, loadTree, uuid, loadFromJsonLogic} = Utils;
//const preStyle = { backgroundColor: "darkgrey", margin: "10px", padding: "10px" };
//const preErrorStyle = { backgroundColor: "lightpink", margin: "10px", padding: "10px" };

//const emptyInitValue: JsonTree = {"id": uuid(), "type": "group"};

// get init value in JsonTree format:
//const initValue: JsonTree = loadedInitValue && Object.keys(loadedInitValue).length > 0 ? loadedInitValue as JsonTree : emptyInitValue;
//const initTree: ImmutableTree = checkTree(loadTree(initValue), loadedConfig);

// -OR- alternativaly get init value in JsonLogic format:
//const initLogic: JsonLogicTree = loadedInitLogic && Object.keys(loadedInitLogic).length > 0 ? loadedInitLogic : undefined;
//const initTree: ImmutableTree = checkTree(loadFromJsonLogic(initLogic, loadedConfig), loadedConfig);


export interface DemoQueryBuilderProps {
  key: any;
  tree: ImmutableTree;
  config: Config;
  operator: string;
  onBuilderChange(builderState: DemoQueryBuilderState, builderProps:DemoQueryBuilderProps) : void;
}

export interface DemoQueryBuilderState {
  operator: string;
  tree: ImmutableTree;
  expression: string;
}

export default class DemoQueryBuilder extends React.Component<DemoQueryBuilderProps, DemoQueryBuilderState> {
    private immutableTree: ImmutableTree;
    public operator: string;
    public expression: string;
    
    constructor(props: DemoQueryBuilderProps){
      super(props);
      this.state = {
        operator: this.props.operator,
        tree: this.props.tree,
        expression: ""
      };
    }

    render = () => (
      <div>
        <Query 
          {...this.props.config} 
          value={this.props.tree}     // unsure
          onChange={this.onChange}
          renderBuilder={this.renderBuilder}
        />
        <Select
          labelId="selector"
          id="selector"
          onChange={this.onSelectorChange}  
          value={this.state.operator}  
        >   
          <MenuItem value="none">
            <em>None</em>
          </MenuItem>   
          <MenuItem value={"and"}>and</MenuItem>
          <MenuItem value={"or"}>or</MenuItem>
        </Select>
        <div>{this.state.expression}</div>
      </div>
    )

    componentDidUpdate() {
      this.props.onBuilderChange(this.state, this.props);
    }

    renderBuilder = (props: BuilderProps) => (
      <div className="query-builder-container" style={{padding: "10px"}}>
        <div className="query-builder qb-lite">
          <Builder {...props} />
        </div>
      </div>
    )
    
    onChange = (immutableTree: ImmutableTree, config: Config) => {
      this.immutableTree = immutableTree;
      this.expression = stringify(queryString(immutableTree, config), undefined, 2);
      this.updateResult();
    }

    onSelectorChange = (event) => {  
     this.operator = event.target.value;
     this.expression = /*stringify(*/queryString(this.state.tree, this.props.config);/*, undefined, 2);*/
     this.updateResult();
    };
 
    updateResult = throttle(() => {
      this.setState({tree: this.immutableTree, operator: this.operator, expression: this.expression});
    }, 100)
}
