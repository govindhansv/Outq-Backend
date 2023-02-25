import Follow from "../models/Follow.js"
import Store from "../models/Store.js"

/* Create new booking order */
export const follow = async (req, res) => {
    // console.log('called');
    try {
        const { storeid, userid } = req.params;
        const store = await Store.findById(storeid);

        const isFollowed = store.followers.get(userid);

        if (isFollowed) {
            store.followers.delete(userid);
        } else {
            store.followers.set(userid, true);
        }

        const updatedStore = await Store.findByIdAndUpdate(
            storeid,
            { followers: store.followers },
            { new: true }
        );

        res.status(201).json(updatedStore);

    } catch (err) {
        // console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};



export const viewstorefollowers = async (req, res) => {
    // console.log('called');
    try {
        const { storeid } = req.params;
        const store = await Store.findById(storeid);

        const followers = store.followers.length;
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

        const isFollowed = store.followers.get(userid);

        if (isFollowed) {
            res.status(201).json({ isfollowed: true });
        } else {
            res.status(201).json({ isfollowed: false });
        }
    } catch (err) {
        // console.log("err", err);
        res.status(500).json({ error: err.message });
    }
};