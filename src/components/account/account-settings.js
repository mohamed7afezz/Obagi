import React, { useEffect, useState, useContext } from "react"
import UserAccount from "../../components/user-account"
import { Link } from 'gatsby'
import accountsettings from "../../assets/scss/components/myaccountsettings.module.scss"
import { CustomSelect } from '../../assets/js/custom-select'
const baseUrl = process.env.Base_URL

export default function AccountSettings() {

  useEffect(() => {
    getData();
    if (document.querySelectorAll('.custom-select .select-selected').length < 1) {
      CustomSelect();
    }
  }, [])

  const [userAccount, setData] = useState({});


  function checkvaild() {

    if (!document.querySelector(".regform").checkValidity()) {
      // console.log(document.querySelector(".regform").validationMessage)
    } else {
      // console.log("hassan", document.querySelector(".regform").checkValidity())
    }
  }

  const [isPassMatch, setIsPassMatch] = useState();
  function checkPassMatch(event) {
    //compare pass
    let confPass = '';

    if (event.target.name === 'new-password') {
      confPass = document.querySelector('#conf-pw').value;
    } else {
      confPass = document.querySelector('#new-password').value;
    }

    if (confPass === event.target.value) {
      setIsPassMatch(true);
    } else {
      setIsPassMatch(false);
    }


    return isPassMatch;
  }

  function handlePassword(event) {
    if (checkPassMatch(event)) {
      setData({
        ...userAccount,
        authentication: {
          ...userAccount.authentication,
          new_password: event.target.value
        }
      })
    } else {
      return false;
    }

  }

  let screenWidth = window.innerWidth;
  function changePosition() {
    let button = document.getElementById("save-button");
    if (screenWidth < 992) {
      if ((document.body.scrollTop == (button.offsetTop)) || (document.body.scrollTop > (button.offsetTop))) {
        button.style.position = "relative";
      } else {
        button.style.position = "fixed";
      }
    }
  }


  async function updateData(event) {

    event.preventDefault();

    const userSettingsData = await fetch(`${baseUrl}bigcommerce/v1/customer_update`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify([userAccount])
    });

    if (userSettingsData.status == 200 && typeof window !== "undefined") {
      window.location.reload();

    }
  
  }

  async function getData() {

    // setIsLoading(true);
    const userAccountData = await (await fetch(`${baseUrl}bigcommerce/v1/mydata/`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    })).json();

    if (userAccountData !== "User not login.") {
      setData(userAccountData.data[0]);
    }

    // setIsLoading(false);
    
  }

  function handleAttr(event) {
    switch (event.target.name) {
      case 'settingsemail':
        setData({
          ...userAccount,
          email: event.target.value
        })

    break;

      case 'settingsmob':
        setData({
          ...userAccount,
          phone: event.target.value
        })

    default: 
      
      break;

  }
  
}




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
                <input type="password" id="new-password" placeholder="" name="new-password" className={`form-control password ${isPassMatch == false ? 'text-warning' : ''}`} onChange={handlePassword} />
              </div>

              <div class="form-group">
                <label for="conf-pw">*Confirm New Password</label>
                <input type="password" id="conf-pw" placeholder="" name="conf-pw" className={`form-control password ${isPassMatch == false ? 'text-warning' : ''}`} onChange={handlePassword} />
              </div>

              <p className={`form-control ${isPassMatch == false ? 'text-warning' : 'd-none'}`}> Pass doesn't match</p>

            </div>
          </div>
        </div>
        <div className={accountsettings.Communicationcon}>
          <div className="row">
            <div className="col-lg-5 col-12">
              <div className={["d-flex", accountsettings.formTitle].join(" ")}>
                <p className={accountsettings.updateP}>Communication</p>
              </div>




                    <div class="form-group">
                      <label for="settingsemail">Email Adress</label>
                      <input type="" class="form-control" name="settingsemail" id="settingsemail" aria-describedby="settingsemailhelp" placeholder="" value={userAccount.email} onChange={handleAttr}/>
                    </div>

                    <div class="form-group">
                      <label for="settingsmob">Mobile Number</label>
                      <input type="tel" class="form-control" id="settingsmob" placeholder="" name="settingsmob" value={userAccount.phone} onChange={handleAttr}/>
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
            <div className={accountsettings.csText}>Our Customer Service Representatives are available to assist you Monday through Friday, from 7am – 4pm PST at 1-800-636-7546.</div>
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
