import { Component } from "react";
import DemoQueryBuilderState, { DemoQueryBuilderProps } from "./demo"
import {
    Query, Builder, Utils, 
    //types:
    ImmutableTree, Config, JsonTree, JsonLogicTree
  } from "react-awesome-query-builder";
  
  import loadConfig from "./config"; // <- you can try './config' for more complex examples
  const initialSkin = "antd";
  const loadedConfig = loadConfig(initialSkin);
  import loadedInitValue from "./init_value";
  import loadedInitLogic from "./init_logic";
import React from "react";
import { Grid } from "@material-ui/core";
import DemoQueryBuilder from "./demo";
import DemoQueryBuilderprops from"./demo";
  const stringify = JSON.stringify;
  const {queryBuilderFormat, jsonLogicFormat, queryString, mongodbFormat, sqlFormat, getTree, checkTree, loadTree, uuid, loadFromJsonLogic} = Utils;
  const preStyle = { backgroundColor: "darkgrey", margin: "10px", padding: "10px" };
  const preErrorStyle = { backgroundColor: "lightpink", margin: "10px", padding: "10px" };
  
  const emptyInitValue: JsonTree = {"id": uuid(), "type": "group"};
  
  // get init value in JsonTree format:
  const initValue: JsonTree = loadedInitValue && Object.keys(loadedInitValue).length > 0 ? loadedInitValue as JsonTree : emptyInitValue;
  const initTree: ImmutableTree = checkTree(loadTree(initValue), loadedConfig);
  //const midOps: ["and", "or"];
  
  //<button onClick={this.resetValue}>reset</button>
  //<button onClick={this.clearValue}>clear</button>
//interface BuilderProps {
 //   configs: Config,
 //   tree: ImmutableTree
//}

interface WrapperState {
  expression: string, 
  builders: DemoQueryBuilderState[]
}

export default class Wrapper extends React.Component<any, WrapperState> {
  childStateMap = new Map();

  constructor(props: any) {
      super(props);
  
      this.state = {
        expression: "",
        builders: [
          {
            tree: initTree,
            config: loadedConfig,
            operator: "Add"
          },
          {
            tree: initTree,
            config: loadedConfig,
            operator: "Add"
          },
        ]
      };

     // this.updateBuilderMap = this.updateBuilderMap.bind(this);
    }

    componentDidMount() {
     // return this.state.builders.map(builder => {
    }
    
    updateBuilderMap(builderState: DemoQueryBuilderState, builderProps:DemoQueryBuilderProps) {
      this.childStateMap[builderProps.key] = builderState;
    }

    /*
    formRow = () => {
      const items = [];
      for(let i = 0; i < this.state.builders.length; i++) {
        items.push(
          <>
            <Grid item>
              <DemoQueryBuilder tree={this.state.builders[i].tree} config={this.state.builders[i].config} operator={"Add"}/>
            </Grid>
          </>
        );
      }
      return items;// <>{items}</>;
    }*/
    
  generateFullExpression = () => {
    var fullExpression = "";
    this.childStateMap.forEach((value: DemoQueryBuilderState, key: string) => {
      fullExpression += "(";
      fullExpression += value.expression; 
      fullExpression += ")";
      if(value.operator == "and" || value.operator == "or") {
        fullExpression += " ";
        fullExpression += value.operator; 
      }
    });
    this.setState(expression: stringify(fullExpression, undefined, 2));
  }

  render = () => (
    <div className={"Wrapper"}>
      <Grid container spacing={1}>
        <Grid container direction="column"> 
          {
            this.state.builders.map((builder, index) => (
              <Grid item>
                <DemoQueryBuilder 
                  tree={builder.tree} 
                  config={builder.config} 
                  operator={builder.operator} 
                  key={index}
                  onBuilderChange={this.updateBuilderMap.bind(this)}/>
              </Grid>
            ))   
          }
        </Grid> 
      </Grid>
      <button onClick={this.generateFullExpression}>Get expression</button>
    </div>
  )

}