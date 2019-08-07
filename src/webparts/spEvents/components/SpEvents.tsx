import * as React from 'react';
import styles from './SpEvents.module.scss';
import { ISpEventsProps } from './ISpEventsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { MSGraphClient } from '@microsoft/sp-http';
import Events from './Event'
import EventObserver from '../../../Observer'

export default class SpEvents extends React.Component<ISpEventsProps, {}> {
  public state ={
    events: []
  };

  public getEvents(calId: string){
    this.props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient): void => {
        client
          .api(`/me/calendars/${calId}/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location`)
          .get((error, events, rawResponse?: any) => {
            console.log(events.value.slice(-3));
            this.setState({events: events.value.slice(-3)});
          });
      });
  }
  public checkPane(){
    if(this.props.toggleUrl){
      console.log('autonomka get url');
      console.log(this.props.url);
      this.getEvents(this.props.url);
    } else if (!this.props.toggleUrl) {
      console.log('conn', this.props.toggleUrl);
      EventObserver.subscribe((options)=>{
        console.log(options.id);
        this.getEvents(options.id)
      });
    }
  }
  public componentWillReceiveProps(){
    this.checkPane();
  }
  public componentDidMount(){
    this.checkPane();
    // this.getEvents('AAMkAGM4MDk1ZjJjLTE4MWEtNDZhZi05YzQyLWEwZjJmMTdkNDFhMwBGAAAAAAAjzoEC7VvfQo2YFXzQdnhJBwAR8p2eMi9dRYZp2VOh30EKAAAAAAEGAAAR8p2eMi9dRYZp2VOh30EKAAABKZO8AAA=');
  }
  public render(): React.ReactElement<ISpEventsProps> {
    return (
      <div className={ styles.spEvents }>
        <div className={ styles.container }>
        <Events eventsarr={this.state.events}/>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <p className={ styles.description }>{escape(this.props.url)}</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
