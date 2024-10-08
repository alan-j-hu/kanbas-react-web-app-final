import { AiFillHome } from "react-icons/ai";
import { BiImport } from "react-icons/bi";
import { BsBellFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { LiaFileImportSolid } from "react-icons/lia";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { RiBarChart2Fill } from "react-icons/ri";
import { VscMegaphone } from "react-icons/vsc";

{/* Find more icons */}
export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      <h2>Course Status</h2>
      <div className="d-flex">
        <div className="w-50 pe-1">
          <button className="btn btn-lg btn-secondary w-100 text-nowrap ">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish </button>
        </div>
        <div className="w-50">
          <button className="btn btn-lg btn-success w-100">
            <FaCheckCircle className="me-2 fs-5" /> Publish </button>
        </div>
      </div><br />
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <AiFillHome className="me-2 fs-5" /> Choose Home Page </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <RiBarChart2Fill className="me-2 fs-5" /> View Course Screen </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <VscMegaphone className="me-2 fs-5" /> New Announcement </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <RiBarChart2Fill className="me-2 fs-5" /> New Analytics </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BsBellFill className="me-2 fs-5" /> View Course Notifications </button>
      {/* Complete the rest of the buttons */}
    </div>
);}
