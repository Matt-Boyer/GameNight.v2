import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import './wishlist.css';
import { thunkAddWISHLIST, thunkGetWishList } from "../../store/wishlist";

function WishList({gameId}) {
  const history = useHistory()
  const dispatch = useDispatch();
  const wishlist = useSelector(state => Object.values(state.wishlist.wishlist))

  useEffect(() => {
    dispatch(thunkGetWishList())
  }, [])

  const alreadyAdded = wishlist.find((ele) => {
    return ele.game_id === parseInt(gameId)
  })

  return (
    <div>
        {alreadyAdded === undefined ? <div id="innerdivwishlistbutton"
        onClick={() => {
          dispatch(thunkAddWISHLIST(gameId))
        }}
        >
          Add to Wish List
        </div> :
        <div id="innerdivwishlistbuttonalreadyin">
          Already in Wish List
        </div>
        }
    </div>
  );
}

export default WishList;
