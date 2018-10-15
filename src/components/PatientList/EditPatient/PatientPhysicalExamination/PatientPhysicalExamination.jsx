import React from "react";

export const PatientPhysicalExamination = (props) => {
  return(
    <div>
    <div className="row">
      <div className="col-md-6">
        <h3>Physical Examination</h3>
      </div>
      <div className="col-md-6 text-right">
        <button className="btn text-btn green">Save</button>
      </div>
    </div>
<div className="row">
<div className="col-md-2">
    <div className="form-group">
        <input type="text" className="form-control" name="" />
        <label className="control-label">Pulse (/min) </label>
    </div>
</div>
<div className="col-md-2">
    <div className="form-group">
        <input type="text" className="form-control" name="" />
        <label className="control-label">BP (mmHg)</label>
    </div>
</div>
<div className="col-md-2">
    <div className="form-group">
        <input type="text" className="form-control" name="" />
        <label className="control-label">JVP</label>
    </div>
</div>
<div className="col-md-2">
    <div className="form-group">
        <input type="text" className="form-control" />
        <label className="control-label">SpO2 (%)</label>
    </div>
</div>
<div className="col-md-2">
    <div className="form-group">
        <input type="text" className="form-control" />
        <label className="control-label">Respiratory Rate (/min)</label>
    </div>
</div>
<div className="col-md-2">
    <div className="form-group">
        <input type="text" className="form-control" name="" />
        <label className="control-label">Face/head</label>
    </div>
</div>
<div className="col-md-2">
    <div className="form-group">
        <input type="text" className="form-control" name="" />
        <label className="control-label">Eye/ENT</label>
    </div>
</div>
<div className="col-md-2">
    <div className="form-group">
        <input type="text" className="form-control" name="" />
        <label className="control-label">Skin</label>
    </div>
</div>
<div className="col-md-2">
    <div className="form-group">
        <input type="text" className="form-control" name="" />
        <label className="control-label">Joints</label>
    </div>
</div>
<div className="col-md-4">
    <div className="form-group">
        <input type="text" className="form-control" name="" />
        <label className="control-label">Other</label>
    </div>
</div>
<div className="clearfix">
    <div className="form-group"></div>
</div>
<div className="col-md-2">
    <div className="form-group">
        <div className="checkbox-section">
            <label><input type="checkbox" className="option-input"/><span>Yes</span></label>
            <label><input type="checkbox" className="option-input"/><span>No</span></label>
        </div>
        <label className="control-label">Cyanosis</label>
    </div>
</div>
<div className="col-md-2">
    <div className="form-group">
        <div className="checkbox-section">
            <label><input type="checkbox" className="option-input"/><span>Present</span></label>
            <label><input type="checkbox" className="option-input"/><span>Absent</span></label>
        </div>
        <label className="control-label">Clubbing</label>
    </div>
</div>
<div className="col-md-2">
    <div className="form-group">
        <div className="checkbox-section">
            <label><input type="checkbox" className="option-input"/><span>Present</span></label>
            <label><input type="checkbox" className="option-input"/><span>Absent</span></label>
        </div>
        <label className="control-label">Bibasilar crackles</label>
    </div>
</div>
<div className="col-md-2">
    <div className="form-group">
        <div className="checkbox-section">
            <label><input type="checkbox" className="option-input"/><span>Present</span></label>
            <label><input type="checkbox" className="option-input"/><span>Absent</span></label>
        </div>
        <label className="control-label">Wheeze </label>
    </div>
</div>
<div className="col-md-2">
    <div className="form-group">
        <div className="checkbox-section">
            <label><input type="checkbox" className="option-input"/><span>Present</span></label>
            <label><input type="checkbox" className="option-input"/><span>Absent</span></label>
        </div>
        <label className="control-label">P2 loud</label>
    </div>
</div>
<div className="col-md-2">
    <div className="form-group">
        <div className="checkbox-section">
            <label><input type="checkbox" className="option-input"/><span>Present</span></label>
            <label><input type="checkbox" className="option-input"/><span>Absent</span></label>
        </div>
        <label className="control-label">Pallor</label>
    </div>
</div>
<div className="col-md-2">
    <div className="form-group">
        <div className="checkbox-section">
            <label><input type="checkbox" className="option-input"/><span>Present</span></label>
            <label><input type="checkbox" className="option-input"/><span>Absent</span></label>
        </div>
        <label className="control-label">Icterus </label>
    </div>
</div>
<div className="clearfix"></div>
<div className="col-md-3">
    <h4>Lymphadenopathy</h4>
    <div className="checkbox-section">
        <label><input type="checkbox" className="option-input" checked /><span>Present</span></label>
        <label><input type="checkbox" className="option-input"/><span>Absent</span></label>
    </div>
    <input type="text" className="form-control" />
</div>
</div>

    </div>
  );
}
