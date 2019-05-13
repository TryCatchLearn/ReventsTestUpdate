import moment from 'moment';

export const createNewEvent = (user, photoURL, event) => {
    event.date = moment(event.date).toDate();
    return {
        ...event,
        hostUid: user.uid,
        hostedBy: user.displayName,
        hostPhotoURL: photoURL || '/assets/user.png',
        created: Date.now(),
        attendees: [
            {
                displayName: user.displayName,
                photoURL: photoURL || '/assets/user.png',
                uid: user.uid,
                going: true,
                joinDate: Date.now()
            }
        ]
    }
}