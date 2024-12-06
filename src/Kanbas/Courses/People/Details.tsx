import { useEffect, useRef, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as client from "../../Account/client";

export default function PeopleDetails() {
  const { uid } = useParams();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);

  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    if (nameRef.current !== null) {
      nameRef.current.value = user.firstName + ' ' + user.lastName;
    }
    if (emailRef.current !== null) {
      emailRef.current.value = user.email;
    }
  };
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate('/Kanbas/Account/Users/');
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [editing, setEditing] = useState(false);
  const saveUser = async (name: String, email: String) => {
    const [firstName, lastName] = name.split(" ");
    const role = roleRef.current === null ? user.role : roleRef.current.value;
    const updatedUser = { ...user, firstName, lastName, email, role };
    console.log(updatedUser);
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    navigate('/Kanbas/Account/Users/');
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={() => navigate('/Kanbas/Account/Users/')} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" /> </button>
      <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
      <div className="text-danger fs-4 wd-name">
        {!editing && (
          <FaPencil onClick={() => setEditing(true)}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {editing && (
          <FaCheck onClick={() => saveUser(name, email)}
              className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        {!editing && (
          <div className="wd-name"
               onClick={() => setEditing(true)}>
          {user.firstName} {user.lastName}</div>)}
        {user && editing && (
          <input key={`wd-edit-name-${uid}`}
            ref={nameRef}
            className="form-control w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(name, email); }}}/>)}
      </div>
      <div>
      <b>Roles:</b>
        {!editing && (<span className="wd-roles">{user.role}</span>)}
        {user && editing && (
          <select ref={roleRef} className="form-select" aria-label="Role">
            <option value="STUDENT" selected={user.role === "STUDENT"}>Student</option>
            <option value="TA" selected={user.role === "TA"}>TA</option>
            <option value="FACULTY" selected={user.role === "FACULTY"}>Faculty</option>
            <option value="ADMIN" selected={user.role === "ADMIN"}>Admin</option>
          </select>)}
      </div>
      <br />
      <div>
      <b>Login ID:</b>
        <span className="wd-login-id">{user.loginId}</span>
      </div>
      <br />
      <div>
      <b>Email:</b>
        {!editing && (
          <span className="wd-email">{user.email}</span>)}
        {user && editing && (
          <input key={`wd-edit-email-${uid}`}
            ref={emailRef}
            className="form-control w-50 wd-edit-email"
            defaultValue={`${user.email}`}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(name, email); }}}/>)}
      </div>
      <br />
      <div>
      <b>Section:</b>
        <span className="wd-section">{user.section}</span>
      </div>
      <br />
      <b>Total Activity:</b>
      <div>
        <span className="wd-total-activity">{user.totalActivity}</span>
      </div>
      <hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
      <button onClick={() => navigate('/Kanbas/Account/Users/')}
              className="btn btn-secondary float-start float-end me-2 wd-cancel" > Cancel </button>
    </div>
  );
}
