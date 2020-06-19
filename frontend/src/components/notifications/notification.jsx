import React from 'react';
import { Link } from 'react-router-dom';
import { NotificationListItem } from './notification_list_item'


class Notifications extends React.Component {
    constructor(props) {
        super(props);

        this.notificationList = this.notificationList.bind(this)

    }
    

    componentDidMount() {
        this.props.fetchNotifications(this.props.currentUser.id);
        this.props.fetchUsers();
        // const filtered = this.props.notifications.filter(notif => (notif['type']==='unseen'));
        // if(filtered.length){
        //     debugger;
        //     filtered.forEach(element => {
        //         this.props.flipNotification(element._id)
        //     });
            
        // }
    }

    componentWillUnmount(){
        debugger;
        const filtered = this.props.notifications.filter(notif => (notif['type'] === 'unseen'));
        if (filtered.length) {
            debugger;
            filtered.forEach(element => {
                this.props.flipNotification(element._id)
            });

        }
    }


    notificationList() {
        return (
            this.props.notifications.reverse().map((notif, idx) => (
                    <NotificationListItem 
                    idx={idx}
                    notif={notif}
                    users={this.props.users}      
                    />
                    //test
                
                    // <h1>TEST</h1>
                    // <h1>TEST</h1>
                    // <h1>TEST</h1>
                    // <h1>TEST</h1>
                    // <p key={idx}>You've matched with {this.props.users[notif.matched_with].name}</p>
                    // <p>Contact your pair via email: {this.props.users[notif.matched_with].email}</p>
                )
            )
        )
    }

    render() {


        if (this.props.notifications.length > 0 && Object.values(this.props.users).length > 0) {
            
            let additionalSpace = this.props.notifications.length * 52;
            
            let height = 350;

            height += additionalSpace
            
            return(
                <div className="notifications-background">
                    <div className="yes-notifications-container"
                    style={{height: `${height}px`}}
                    >
                        <div className="notif-cont">
                            {/* <i class="far fa-smile fa-9x"></i> */}
                            <h1
                            style={{ marginTop: "50px" }}
                            >Happy hacking!</h1>
                            <div className="notification-list-container">
                            {this.notificationList()}
                            </div>
                        </div>
                    </div>
                </div>
            )

        } else if (Object.values(this.props.users).length > 0 && this.props.notifications.length === 0) {
            return(
            <div className="notifications-background">
                <div className="no-notificaitons-container">
                    <div>
                        <i class="fas fa-user-alt-slash fa-9x" />
                            <h1>No likes yet  🙁</h1>
                        <Link to="/play">
                            <button>
                                <h1>Find your match
                                </h1>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            )
        } else {
            return <></>
        }
};
}
export default Notifications;