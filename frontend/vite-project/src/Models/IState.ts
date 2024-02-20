import { IContent } from "./IContent";

export interface IState {
    loading:boolean,
    error:string,
    data:IContent[]
  }
