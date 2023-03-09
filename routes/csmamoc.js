import express from "express";

const router = express.Router();

router.get('/dbms', (req,res) =>{
    let data = [{ title: " sdf", link: " sdf" }];
    res.json(data);
});

router.get('/dcof', (req,res) =>{
    let data = [{ title: " sdf", link: " sdf" }];
    res.json(data);
});
router.get('/mp', (req,res) =>{
    let data = [{ title: " sdf", link: " sdf" }];
    res.json(data);
});
router.get('/html', (req,res) =>{
    let data = [{ title: " sdf", link: " sdf" }];
    res.json(data);
});
router.get('/sensor', (req,res) =>{
    let data = [{ title: " sdf", link: " sdf" }];
    res.json(data);
});
router.get('/java', (req,res) =>{
    let data = [{ title: " sdf", link: " sdf" }];
    res.json(data);
});
router.get('/c', (req,res) =>{
    let data = [{ title: " sdf", link: " sdf" }];
    res.json(data);
});
router.get('/php', (req,res) =>{
    let data = [{ title: " sdf", link: " sdf" }];
    res.json(data);
});
router.get('/ds', (req,res) =>{
    let data = [{ title: " sdf", link: " sdf" }];
    res.json(data);
});
router.get('/python', (req,res) =>{
    let data = [{ title: " sdf", link: " sdf" }];
    res.json(data);
});
router.get('/cg', (req,res) =>{
    let data = [{ title: " sdf", link: " sdf" }];
    res.json(data);
});
router.get('/cn', (req,res) =>{
    let data = [{ title: " sdf", link: " sdf" }];
    res.json(data);
});
router.get('/co', (req,res) =>{
    let data = [{ title: " sdf", link: " sdf" }];
    res.json(data);
});
router.get('/os', (req,res) =>{
    let data = [{ title: " sdf", link: " sdf" }];
    res.json(data);
});
router.get('/dc', (req,res) =>{
    let data = [{ title: " sdf", link: " sdf" }];
    res.json(data);
});
router.get('/android', (req,res) =>{
    let data = [{ title: " sdf", link: " sdf" }, {title: " sdf", link: " sdf" }];
    res.json(data);
});

/*
Scaffold(
    body: ListView.builder(
      itemCount: 10,
      itemBuilder: (BuildContext context, int index) {
        return ListTile(
          title: Text('Item $index'),
          subtitle: Text('This is item number $index'),
          leading: Icon(Icons.ac_unit),
          trailing: Icon(Icons.arrow_forward),
          onTap: () {
            print('Item $index tapped');
          },
        );
      },
    ),
  ),
   */

export default router;
