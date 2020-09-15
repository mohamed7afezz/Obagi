import React, { useEffect, useState } from "react"
import UserAccount from "../../components/user-account"

import accountsettings from "../../assets/scss/components/myaccountsettings.module.scss"
import {CustomSelect} from '../../assets/js/custom-select'
const baseUrl = process.env.Base_URL

export default function AccountSettings() {
    useEffect(() => {
        if(document.querySelectorAll('.custom-select .select-selected').length < 1) {
          CustomSelect();
        }
    })
  return (
    <UserAccount activeTab="account-settings">
      <div className="tab-pane active" id="accountsetting" role="tabpanel">
        <div
          className={[
            accountsettings.secondTitleWrapper,
            "d-none d-lg-flex",
          ].join(" ")}
        >
          <div className={accountsettings.secondTitle}>Account Settings</div>
          <button
            type="button"
            className={accountsettings.addressButton}
            data-toggle="modal"
            data-target="#address-modal"
          >
            Save Settings
          </button>
        </div>
        <div className="row">
          <div className="col-lg-4 col-12">
            <div className={accountsettings.updatePasswordCon}>
              <div className={["d-flex", accountsettings.formTitle].join(" ")}>
                <p className={accountsettings.updateP}>Update Password</p>
                <p className={accountsettings.UpdateOption}>*Required fileds</p>
              </div>
              <div className={accountsettings.formfield}>
                <p className={accountsettings.fieldTitle}>*Current Password</p>
                <input type="password" />
              </div>
              <div className={accountsettings.formfield}>
                <p className={accountsettings.fieldTitle}>*New Password</p>
                <input type="password" />
              </div>
              <div className={accountsettings.formfield}>
                <p className={accountsettings.fieldTitle}>
                  *Confirm New Password
                </p>
                <input type="password" />
              </div>
            </div>
          </div>
        </div>
        <div className={accountsettings.Communicationcon}>
          <div className="row">
            <div className="col-lg-4 col-12">
              <div className={accountsettings.updatePasswordCon}>
                <div
                  className={["d-flex", accountsettings.formTitle].join(" ")}
                >
                  <p className={accountsettings.updateP}>Communication</p>
                </div>
                <div className={accountsettings.formfield}>
                  <p className={accountsettings.fieldTitle}>Email Adress</p>
                  <input
                    className={accountsettings.accountsettinginput}
                    type="email"
                  />
                </div>
                <div className={accountsettings.formfield}>
                  <p className={accountsettings.fieldTitle}>Mobile Number</p>
                  <input
                    className={accountsettings.accountsettinginput}
                    type="tel"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={accountsettings.DateBirthCon}>
          <div className="row">
            <div className="col-lg-6 col-12">
            <div className={["d-flex", accountsettings.formTitle].join(" ")}>
            <p className={accountsettings.updateP}>Date of Birth</p>
          </div>
          <div className={["d-flex", accountsettings.formTitle].join(" ")}>
          <div className={accountsettings.selectcontainer}>
              <p className={accountsettings.selectTitle}>DAY</p>    
          <div className="custom-select birthselect">
              
          <select id="birth-select" name="filter by">
            <option vlaue="Select">Select</option>
            <option vlaue="Select">Select</option>
            <option value="Aloe">31</option>
    
          </select>
        </div>
        </div>
          <div className={accountsettings.selectcontainer}>
              <p className={accountsettings.selectTitle}>MONTH</p>    
          <div className="custom-select birthselect">
              
          <select id="birth-select" name="filter by">
            <option vlaue="Select">Select</option>
            <option vlaue="Select">Select</option>
            <option value="Aloe">dec</option>
     
          </select>
        </div>
        </div>
          <div className={[accountsettings.selectcontainer,accountsettings.endselect].join(" ")}>
              <p className={accountsettings.selectTitle}>YEAR</p>    
          <div className="custom-select birthselect">
              
          <select id="birth-select" name="filter by">
            <option vlaue="Select">Select</option>
            <option vlaue="Select">Select</option>
            <option value="Aloe">2020</option>
          </select>
        </div>
        </div>
    
    
     </div>
            </div>
          </div>
         
        </div>
        <div className={accountsettings.SaveButton}>
          <div className="row">
            <div className="col-lg-4 col-12">
                <button className={accountsettings.saveSitting}>
                SAVE SETTINGS
                </button>
                </div>
                </div>
                </div>
      </div>
    </UserAccount>
  )
}
