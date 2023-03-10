import React ,{useEffect, useState } from 'react'
import axios from "axios";
import { useLocation } from "react-router";
import './individualorder.css'


export default function Individualoder() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [collectiondate, setCollectiondate] = useState("");
  const [returndate, setreturndate] = useState("");
  const [smallitems, setsmallitems] = useState("");
  const [largeitems, setlargeitems] = useState("");
  const [hugeitems, sethugeitems] = useState("");
  const [duration, setduration] = useState("");
  const [residence, setresidence] = useState("");
  const [notes, setnotes] = useState("");
  const [price, setprice] = useState("");


  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/admin/" + path);
      setPost(res.data);
      setName(res.data.name);
      setContact(res.data.contact);
      setEmail(res.data.email);
      setreturndate(res.data.returndate);
      setduration(res.data.duration);
      setresidence(res.data.residence);
      setnotes(res.data.notes);
      setprice(res.data.price);
      console.log(price)
    };
    getPost();
  }, [post,path]);

  const getTotal = () => {
    let totalcost = 0.00;
    totalcost = post.duration * (post.smallitems * 8.00 + post.largeitems * 15.00 + post.hugeitems * 22.00)
    return totalcost
  }

  const returning = new Date(post.returntime).toLocaleTimeString()
  const collection = new Date(post.collectiontime).toLocaleTimeString()
  const returningdate = new Date(post.returndate).toLocaleDateString()
  const collectingdate = new Date(post.collectiondate).toLocaleDateString()

  const [updateMode, setUpdateMode] = useState(false);

  const handleUpdate = async () => {
    try {
      await axios.put(`/admin/${post._id}`, {
        name,
        contact,
        email,
        collectiondate,
        returndate,
        smallitems,
        largeitems,
        hugeitems,
        duration,
        residence,
        notes,
        price,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
      <div className='individual-order'>
        <div className='singlePostWrapper'>
        <div class='wording-post'>
        <h1 class='name-title'>Customer: {post.name}</h1>
        <h1 class='PostTitle'>Customer Details: </h1>
        <div class='post-group'>
          <p className="singlePostDesc">Contact: {post.contact}</p>
          <p className="singlePostDesc">Email: {post.email}</p>
        </div>

        <h1 class='PostTitle'>Collection and return details: </h1>
        <div class='post-group'>
            {updateMode ? (<p className="singlePostTitleInput-items" >Collection Date: </p>) : (<p></p>)}
              {updateMode ? (
              <input type="text" value={collectiondate} className="singlePostTitleInput" autoFocus onChange={(e) => setCollectiondate(e.target.value)}/>
            ) : (
              <p className="singlePostDesc">Collection Date: {collectingdate}</p>
            )}
          <p className="singlePostDesc">Collection Time: {collection}</p>

          <p className="singlePostDesc">Return Date: {returningdate}</p>
          <p className="singlePostDesc">Collection Time: {returning}</p>
        </div>

        <h1 class='PostTitle'>Items for Storage: </h1>
        <div class='singlePostDesc'>
          {updateMode ? (<p className="singlePostTitleInput-items" >Small Items: </p>) : (<p></p>)}
          {updateMode ? (
          <input type="text" value={smallitems} className="singlePostTitleInput" autoFocus onChange={(e) => setsmallitems(e.target.value)}/>
        ) : (
          <p className="singlePostDesc">Small Items: {post.smallitems} </p>
        )}
        </div>

        <div class='singlePostDesc'>
          {updateMode ? (<p className="singlePostTitleInput-items" >Large Items: </p>) : (<p></p>)}
          {updateMode ? (
          <input type="text" value={largeitems} className="singlePostTitleInput" autoFocus onChange={(e) => setlargeitems(e.target.value)}/>
        ) : (
          <p className="singlePostDesc">Large Items: {post.largeitems} </p>
        )}
        </div>


        <div class='singlePostDesc'>
          {updateMode ? (<p className="singlePostTitleInput-items" >Huge Iterms: </p>) : (<p></p>)}
          {updateMode ? (
          <input type="text" value={hugeitems} className="singlePostTitleInput" autoFocus onChange={(e) => sethugeitems(e.target.value)}/>
        ) : (
          <p className="singlePostDesc">Huge Iterms: {post.hugeitems} </p>
        )}
        </div>

        <h1 class='PostTitle'>Storage Duration and place of residence: </h1>
        <div class='post-group'>
          <p className="singlePostDesc">Duration: {post.duration}</p>
          <p className="singlePostDesc">Residence: {post.residence}</p>
          <p className="singlePostDesc"> Additional Notes: {post.notes}</p>
        </div>

        <h1 className="singlePriceDesc">Total Price: {getTotal()}</h1>
        </div>
        {!updateMode && (
          <div className="singlePostEdit">
            <button
              onClick={() => setUpdateMode(true)}
            >Edit</button>
          </div>
        )}

        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
        </div>
      </div>
    )
}