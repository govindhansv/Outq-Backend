
import Store from "../models/Store.js";

/* LOGGING IN */
export const fetch = async (req, res) => {
  // console.log('called');
  try {

    const { storeid } = req.params;
    const store = await Store.find({ _id: storeid });
    res.status(201).json(store);

  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: true });
  }
};
