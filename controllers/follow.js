import Follow from "../models/Follow.js"
import Store from "../models/Store.js"
import Noti from "../models/Noti.js"
import User from "../models/User.js"

/* Create new booking order */
export const follow = async (req, res) => {
    console.log('called');
    try {
        const { storeid, userid } = req.params;
        console.log(storeid,userid);
        const store = await Store.findById(storeid);
        console.log('folloerr');
        const user = await User.findById(userid);
        console.log(store);
        const isFollowed = store.followerslist.includes(userid);
        console.log("status of folloe", isFollowed);
        if (isFollowed) {
            const index = store.followerslist.indexOf(userid);

            if (index !== -1) {
                store.followerslist.splice(index, 1);
                console.log(`Removed ${userid} from the array`);
                const newNoti = new Noti({
                    title: "You Lost your Follower ",
                    message: `${user.name} is stopped following your store`,
                    storeid: storeid
                });
                const noti = await newNoti.save();

            }
        } else {
            store.followerslist.push(userid);
            console.log(store.followerslist);
            const newNoti = new Noti({
                title: "You have new Follower ",
                message: `${user.name} is started following your store`,
                storeid: storeid
            });

            const noti = await newNoti.save();
        }

        Store.findByIdAndUpdate(
            { _id: storeid },
            {
                $set:
                {
                    followerslist: store.followerslist
                }
            }
        ).then(async (data, err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);


            }
        })

        // res.status(201).json(updatedStore);

    } catch (err) {
        console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};



export const viewstorefollowers = async (req, res) => {
    // console.log('called');
    try {
        const { storeid } = req.params;
        const store = await Store.findById(storeid);

        const followers = store.followerslist.length;
        res.status(201).json(followers);
    } catch (err) {
        // console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};

export const checkfollow = async (req, res) => {
    // console.log('called');
    try {
        const { storeid, userid } = req.params;
        const store = await Store.findById(storeid);

        const isFollowed = store.followerslist.includes(userid);
        console.log("status of folloe", isFollowed);
        if (isFollowed) {
            res.status(201).json({ followed: true });
        } else {
            res.status(201).json({ followed: false });
        }

    } catch (err) {
        // console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};