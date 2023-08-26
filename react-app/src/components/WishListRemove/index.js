import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import './wishlistremove.css';
import { thunkAddWISHLIST, thunkGetWishList, thunkDeleteWishList } from "../../store/wishlist";

function WishListRemove({gameId}) {
  const dispatch = useDispatch();

  return (
    <div
    onClick={() => {
      dispatch(thunkDeleteWishList(gameId))
    }}
    >
        <div id="removefromwishlistbutton"
        onClick={() => {
          dispatch(thunkDeleteWishList(gameId))
        }}
        >
          <div>
            Remove from Wish List
          </div>
        </div>
    </div>
  );
}

export default WishListRemove;
