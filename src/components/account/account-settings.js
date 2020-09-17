import React, { useEffect, useState } from "react"
import UserAccount from "../../components/user-account"

import accountsettings from "../../assets/scss/components/myaccountsettings.module.scss"
import { CustomSelect } from '../../assets/js/custom-select'
const baseUrl = process.env.Base_URL

export default function AccountSettings() {
  useEffect(() => {
    if (document.querySelectorAll('.custom-select .select-selected').length < 1) {
      CustomSelect();
    }
  })
  return (
    <UserAccount activeTab="account-settings">
      <div className="tab-pane active account-settings" id="accountsetting" role="tabpanel">
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
          <div className="col-lg-5 col-12">
            <div className={accountsettings.updatePasswordCon}>
              <div className={["d-flex", accountsettings.formTitle].join(" ")}>
                <p className={accountsettings.updateP}>Update Password</p>
                <p className={accountsettings.UpdateOption}>*Required fileds</p>
              </div>

              <form>
                <div class="form-group">
                  <label for="current-password">*Current Password</label>
                  <input type="password" class="form-control" name="current-password" id="current-password" aria-describedby="passhelp" placeholder="" />
                </div>

                <div class="form-group">
                  <label for="new-password">*New Password</label>
                  <input type="password" class="form-control" id="new-password" placeholder="" name="new-password" />
                </div>

                <div class="form-group">
                  <label for="conf-pw">*Confirm New Password</label>
                  <input type="password" class="form-control" id="conf-pw" placeholder="" name="conf-pw" />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={accountsettings.Communicationcon}>
          <div className="row">
            <div className="col-lg-5 col-12">
              <form>
                
                <div class="form-group">
                  <label for="settingsemail">Email Adress</label>
                  <input type="email" class="form-control" name="settingsemail" id="settingsemail" aria-describedby="settingsemailhelp" placeholder="" />
                </div>

                <div class="form-group">
                  <label for="settingsmob">Mobile Number</label>
                  <input type="tel" class="form-control" id="settingsmob" placeholder="" name="settingsmob" />
                </div>

              </form>
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
                <div className={[accountsettings.selectcontainer, accountsettings.endselect].join(" ")}>
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
