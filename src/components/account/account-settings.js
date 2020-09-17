import React, { useEffect, useState, useContext } from "react"
import UserAccount from "../../components/user-account"
import { Link } from 'gatsby'
import accountsettings from "../../assets/scss/components/myaccountsettings.module.scss"
import { CustomSelect } from '../../assets/js/custom-select'
const baseUrl = process.env.Base_URL

export default function AccountSettings() {
  useEffect(() => {
    if (document.querySelectorAll('.custom-select .select-selected').length < 1) {
      CustomSelect();
    }
  })

  let screenWidth = window.innerWidth;
  function changePosition() {
    let button = document.getElementById("save-button");
    if (screenWidth < 992) {
      if (button.scrollTop == (button.offsetTop + 16) || button.scrollTop > (button.offsetTop + 16)) {
        button.style.position = "relative";
      } else {
        button.style.position = "fixed"
      }
    }
    console.log("offset", button.offsetTop)
  }


  async function updateData(event) {

    event.preventDefault();


    if (typeof window !== "undefined") {


      var userData = {
        id: 3,
        email: document.getElementById("settingsemail").value,
        first_name: "Samo",
        last_name: "Zaki",
        company: "Effvision",
        phone: document.getElementById("settingsmob").value,
        registration_ip_address: "l",
        notes: "adipisicing incididunt quis dolor",
        tax_exempt_category: "Excepteur ",
        customer_group_id: 0,
        authentication: {
          force_password_reset: false,
          new_password: document.getElementById("conf-pw").value
        }
      }
    }

    const userSettingsData = await fetch(`${baseUrl}bigcommerce/v1/customer_update`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify([userData])
    });

    if (userSettingsData.status == 200 && typeof window !== "undefined") {
      window.location.reload();

    }
    console.log("box", userSettingsData.status);
  }

  const [userAccount, setData] = useState({});
  async function getData() {

    // setIsLoading(true);
    const userAccountData = await (await fetch(`${baseUrl}bigcommerce/v1/mydata/`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    })).json();

    if (userAccountData !== "User not login.") {
      setData(userAccountData);
    }

    // setIsLoading(false);
    console.log("user data", userAccountData);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <UserAccount activeTab="account-settings">
      <form method="post"
        onSubmit={event => {
          updateData(event)
        }}>
        <div className="tab-pane active account-settings" id="accountsetting" role="tabpanel">
          <div
            className={[
              accountsettings.secondTitleWrapper,
              "d-none d-lg-flex",
            ].join(" ")}
          >
            <div className={accountsettings.secondTitle}>Account Settings</div>
            <button
              type="submit"
              className={accountsettings.addressButton}
            >
              Save Settings
          </button>
          </div>
          <div className="row">
            <div className="col-lg-5 col-12">
              <div className={accountsettings.updatePasswordCon}>
                <div className={["d-flex", accountsettings.formTitle].join(" ")}>
                  <p className={accountsettings.updateP}>Update Password</p>
                  <p className={accountsettings.UpdateOption}>*Required fields</p>
                </div>

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

              </div>
            </div>
          </div>
          <div className={accountsettings.Communicationcon}>
            <div className="row">
              <div className="col-lg-5 col-12">
                <div className={["d-flex", accountsettings.formTitle].join(" ")}>
                  <p className={accountsettings.updateP}>Communication</p>
                </div>



                {userAccount.data ? userAccount.data.map((item) => {
                  return (
                    <>
                      <div class="form-group">
                        <label for="settingsemail">Email Adress</label>
                        <input type="" class="form-control" name="settingsemail" id="settingsemail" aria-describedby="settingsemailhelp" placeholder="" value={item.email} />
                      </div>

                      <div class="form-group">
                        <label for="settingsmob">Mobile Number</label>
                        <input type="tel" class="form-control" id="settingsmob" placeholder="" name="settingsmob" value={item.phone} />
                      </div>

                    </>
                  )
                }) :
                  <>

                    <div class="form-group">
                      <label for="settingsemail">Email Adress</label>
                      <input type="" class="form-control" name="settingsemail" id="settingsemail" aria-describedby="settingsemailhelp" placeholder="" value="" />
                    </div>

                    <div class="form-group">
                      <label for="settingsmob">Mobile Number</label>
                      <input type="tel" class="form-control" id="settingsmob" placeholder="" name="settingsmob" value="" />
                    </div>

                  </>
                }

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

          <div className="row d-lg-none">
            <div className="col-12">
              <div className={accountsettings.csTitle}>Customer Service</div>
              <div className={accountsettings.csText}>Our Customer Service Specialists are available to assist you Monday through Friday from 9am to 5pm EST. Feel free to give us a call at  1-800-636-7546 or <Link to="mailto:@email.com">Email Us</Link></div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-12">
              <div className={accountsettings.SaveButton} id="save-button" onTouchStart={() => { changePosition(); }}>
                <button className={accountsettings.saveSitting}>
                  SAVE SETTINGS
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </UserAccount>
  )
}
