import * as React from 'react';
import  styles  from './SpEvents.module.scss';
const Events = ({eventsarr}) => {
    console.log(eventsarr);
    return(
        <div>
            <div className={styles.container}>
                {eventsarr.map(({subject,start,id,location}) => {
                    const date = start.dateTime.split("T")[0];
                    return(
                        <div key={id}>
                            <div>
                                <h1>{date}</h1>
                            </div>
                            <div>
                                <p>{subject}</p>
                                <p>{location.displayName}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Events;