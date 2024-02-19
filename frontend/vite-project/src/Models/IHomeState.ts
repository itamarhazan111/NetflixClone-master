import { IContent } from "./IContent";

export interface IHomeState {
    loading:boolean,
    error:string,
    data:IContent[]
  }
  