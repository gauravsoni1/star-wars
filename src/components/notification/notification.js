import React from 'react';
import styles from './notification.module.scss';

const Notification = (props) =>{
    let classToApply = ""
    if (props.msg.type === "error"){
        classToApply = styles.error
    }
    return(
        <div className={styles.notification + " "+ classToApply}>{props.msg.message}</div>
    )
}

export default Notification;