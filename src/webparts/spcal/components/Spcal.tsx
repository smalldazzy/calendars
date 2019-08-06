import * as React from 'react';
import styles from './Spcal.module.scss';
import { ISpcalProps } from './ISpcalProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { string } from 'prop-types';
import { Dropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';



export default class Spcal extends React.Component<ISpcalProps, {}> {
  public state = { //почему ругается на private
    userName: string,
    userMail: string,
    options: [],
    dropprops: string

  };
  public getUserData() {
    this.props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient): void => {
        client
          .api('/me')
          .get((error, user: MicrosoftGraph.User, rawResponse?: any) => {
            console.log(user);
            this.setState({
              userName: user.displayName,
              userMail: user.mail
            });
          });
      });
  }
  public getCalendars(){
    this.props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient): void => {
        client
          .api('/me/calendars')
          .get((error, calendars, rawResponse?: any) => {
            let options=[];
            console.log(calendars);
            calendars.value.forEach(cal => {
              options.push({
                id: cal.id,
                text: cal.name
              });
            });
            this.setState({
              options:options
            });
          });
      });
  }
  public calChosen (options) {
    console.log('calendar chosen');
    console.log(options.id);
   
    localStorage.setItem("calik", JSON.stringify(options.id));
    //console.log(this.properties)
  }
  public componentDidMount(){
    this.getUserData();
    this.getCalendars();
  }
  public render(): React.ReactElement<ISpcalProps> {
    return (
      <div className={styles.spcal}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <p className={styles.subTitle}>{this.state.userName}</p>
              <p className={styles.subTitle}>{this.state.userMail}</p>
              <Dropdown
                label='Calendars Dropdown'
                placeholder="Select an option"
                options={this.state.options}      
                styles={{label: styles.subTitle}}
                onChange={(event,options) => this.calChosen(options)}
              ></Dropdown>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
