import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import AdminView from "../components/AdminView";
import Userslist from "./Userslist";

export default function Adminscreen() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser.isAdmin) {
      navigate("/");
    }
  }, []);

  return (
    <AdminView>
      <Userslist />
    </AdminView>
  );
}
