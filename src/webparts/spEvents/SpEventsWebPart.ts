import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { PropertyFieldToggleWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldToggleWithCallout';
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';

import * as strings from 'SpEventsWebPartStrings';
import SpEvents from './components/SpEvents';
import { ISpEventsProps } from './components/ISpEventsProps';

export interface ISpEventsWebPartProps {
  url: string;
  toggleUrl: boolean;
  

}
// export interface IPropertyControlsTestWebPartProps {
//   toggleInfoHeaderValue: boolean;
// }

export default class SpEventsWebPart extends BaseClientSideWebPart<ISpEventsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpEventsProps > = React.createElement(
      SpEvents,
      {
        url: this.properties.url,
        context: this.context,
        toggleUrl: this.properties.toggleUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  // protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void{
  //   if(propertyPath==='url'){

  //   }
  // }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldToggleWithCallout('toggleUrl', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'toggleInfoHeaderFieldId',
                  label: 'Turn on connection',
                  calloutContent: React.createElement('p', {}, 'With this control you can enable or disable connection to the 1st webpart'),
                  onText: 'Connected to the 1st webpart',
                  offText: 'Autonomous',
                  checked: this.properties.toggleUrl
                }),
                PropertyPaneTextField('url', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
