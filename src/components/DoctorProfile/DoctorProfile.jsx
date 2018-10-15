import React from "react";
import {DoctorBasicInfo} from "./DoctorBasicInfo";
import {DoctorSpecialisation} from "./DoctorSpecialisation";
import {DoctorEducationDegree} from "./DoctorEducationDegree";
import {DoctorAwards} from "./DoctorAwards";
import {DoctorExperience} from "./DoctorExperience";
import {DoctorMembership} from "./DoctorMembership";
import {DoctorMedia} from "./DoctorMedia";
import {DoctorTiming} from "./DoctorTiming";


export const DoctorProfile = (props) => {
  return (

          <div>
            <DoctorBasicInfo />
            <div className="col-md-9 scroll">
              <DoctorEducationDegree />
              <DoctorSpecialisation />
              <DoctorAwards />
              <DoctorTiming />
              <DoctorMedia />
              <DoctorExperience />
              <DoctorMembership />
            </div>
            </div>

  );
}
