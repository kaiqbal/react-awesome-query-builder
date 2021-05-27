import { Component } from "react";
import DemoQueryBuilderState from "./demo"
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

export default class Wrapper extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
  
      this.state = {
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
    }

    componentDidMount() {
     // return this.state.builders.map(builder => {
    }
    

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
    }
    



render = () => (
  <div className={"Wrapper"}>
    <Grid container spacing={1}>
      <Grid container direction="column"> 
        {
          this.state.builders.map((builder) => (
            <Grid item>
              <DemoQueryBuilder tree={builder.tree} config={builder.config} operator={builder.operator}/>
            </Grid>
          ))   
        }
      </Grid> 
    </Grid>
  </div>
)

/*
render = () => (
  <div className={"DemoQueryBuilder"}>
    <Grid container item>
      <Grid container item>
        <DemoQueryBuilder
               tree={initTree} 
               config={loadedConfig}/> 
               </Grid>
    </Grid>
  </div>
)
  */

      
}