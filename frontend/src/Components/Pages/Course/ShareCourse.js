import React, { Fragment } from 'react';
import { RWebShare } from "react-web-share";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useSelector } from 'react-redux';
function ShareCourse() {
     const { course } = useSelector((state) => state.courseDetails);
    return (
        <Fragment>
            <RWebShare
                data={{
                    url: `http://localhost:3000/course/details/${course._id}`,
                    title: "SCTC",
                }}
                onClick={() => console.log("Shared Successfully!")}
            >
                <span><ShareOutlinedIcon  /></span>
            </RWebShare>
        </Fragment>
    )
}

export default ShareCourse