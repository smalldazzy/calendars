import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISpEventsProps {
  url: string;
  context: WebPartContext;
  toggleUrl: boolean;
}
