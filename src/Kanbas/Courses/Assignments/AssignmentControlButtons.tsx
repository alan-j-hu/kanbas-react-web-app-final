import { FaTrash } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";

function DeleteAssignmentDialog({ deleteAssignment } : { deleteAssignment : () => void }) {
  return (
    <div id="wd-delete-assignment-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Delete Assignment?</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Don't Delete</button>
            <button type="button" onClick={deleteAssignment} data-bs-dismiss="modal" className="btn btn-danger">
              Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AssignmentControlButtons({ deleteAssignment } : { deleteAssignment : () => void }) {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <FaTrash data-bs-toggle="modal" data-bs-target="#wd-delete-assignment-dialog"/>
      <IoEllipsisVertical className="fs-4" />
      <DeleteAssignmentDialog deleteAssignment={deleteAssignment}/>
    </div>
);}
