import React, { useEffect, useState, useContext } from "react"
import UserAccount from "../../components/user-account"
import { Link } from 'gatsby'
import accountsettings from "../../assets/scss/components/myaccountsettings.module.scss"
import { CustomSelect } from '../../assets/js/custom-select'
import Scrollbars from 'react-custom-scrollbars';
import UserContext from '../../providers/user-provider';
import $ from 'jquery'

const baseUrl = process.env.Base_URL

export default function AccountSettings() {
  const { err } = useContext(UserContext);

  useEffect(() => {
    getData();
    // if (document.querySelectorAll('.custom-select .select-selected').length < 1) {
    //   CustomSelect();
    // }
  }, [])

  // Date format must be yyyy/mm/dd
  function isValidDate(dateString) {
    // // First check for the pattern
    // if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
    //     return false;

    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12)
      return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  };

  let today = new Date();
  let dd = String(today.getDate());
  let mm = String(today.getMonth() + 1); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;


  const [isToday, setIsToday] = useState();


  let yearsList = [];
  let currentYear = new Date().getFullYear()
  for (let i = 1900; i <= currentYear; i++) {
    yearsList.push(i.toString());
  }

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
  //   else {
  //     let res = await userSettingsData.json();
  //     setErr(res.errors);
  // }
    console.log("ashh user", !isValidDate(userAccount.birthdate), userAccount.birthdate === today.toString(), userAccount.birthdate, today.toString())

    if (!isValidDate(userAccount.birthdate) || userAccount.birthdate === today.toString()) {
      // show error message for date of birth field
      // console.log('bahiii', 'date wrong')
      setIsToday(true);
      return false;
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
    switch (event.target.name || event.target.attributes['data-name'].value) {

      case 'date':

        var dateOfBirth = userAccount.birthdate.split('-');
        if (event.target.classList.contains('day')) {
          dateOfBirth[2] = event.target.attributes['data-value'].value;
        } else if (event.target.classList.contains('month')) {
          dateOfBirth[1] = event.target.attributes['data-value'].value;
        } else {
          dateOfBirth[0] = event.target.attributes['data-value'].value;
        }
        dateOfBirth = dateOfBirth.join('-');

        setData({
          ...userAccount,
          birthdate: dateOfBirth
        })
        // console.log("ashhuser", newUser)

        break;

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

  useEffect(() => {
    if (typeof window != undefined) {
      // console.log("ashhh", yearsList)
      document.querySelectorAll('.new-select').forEach(select => select.addEventListener('click', function () {
        this.nextSibling.classList.remove('hide');
        this.classList.add('hide');
      }));

      document.querySelectorAll('.Give-val').forEach(item => item.addEventListener('click', function (e) {
        this.closest('.old-select').previousSibling.classList.remove('hide');
        this.closest('.old-select').classList.add('hide');

        if (this.closest('.day-select')) {
          this.closest('.day-select').previousSibling.querySelector('.select-selected').innerHTML = this.innerHTML;
          //  $('input[name="day"]').val()=$(this).attr('value')

        } else if (this.closest('.month-select')) {
          this.closest('.month-select').previousSibling.querySelector('.select-selected').innerHTML = this.innerHTML;

        } else if (this.closest('.year-select')) {
          this.closest('.year-select').previousSibling.querySelector('.select-selected').innerHTML = this.innerHTML;
        }
      }));
    }
  }, [])


console.log("ashh" , err)

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
              <div className={`errors ${err != undefined ? 'errors bg-light' : ''}`}>
                <ul>
                  {err !== undefined ? Object.entries(err).map(item => <li className="text-danger">{item[1]}</li>) : ''}
                  {isToday == true ? <li className="text-danger">Please submit the correct date of birth.</li> : ""}
                </ul>

              </div>
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

                <p className={`form-control ${isPassMatch == false ? 'text-warning' : 'd-none'}`}>Those passwords doesn't match. Try again.</p>

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
                  <label for="settingsemail">Email Address</label>
                  <input type="" class="form-control" name="settingsemail" id="settingsemail" aria-describedby="settingsemailhelp" placeholder="" value={userAccount.email} onChange={handleAttr} />
                </div>

                <div class="form-group">
                  <label for="settingsmob">Mobile Number</label>
                  <input type="tel" class="form-control" id="settingsmob" placeholder="" name="settingsmob" value={userAccount.phone} onChange={handleAttr} />
                </div>

              </div>
            </div>
          </div>
          <div className={accountsettings.DateBirthCon}>
            <div className="row">
              <div className="col-lg-6 col-12 register">
                <div className={["d-flex", accountsettings.formTitle].join(" ")}>
                  <p className={accountsettings.updateP}>Date of Birth</p>
                </div>
                <div className="day-mon-year">
                  <div className="day-month">
                    <div class="form-group select-group new-select  day-select">
                      <label for="reviewFormSelect" class="form-label">*Day</label>
                      <div class="select-selected">Select</div>
                    </div>
                    <div className="form-group select-group  old-select day-select hide">
                      <label for="reviewFormSelect" className="form-label">*Day</label>
                      <div className="select-wrap">
                        <Scrollbars style={{ height: 200 }}>
                          <div className="form-control" id="reviewFormSelectDay">
                            {
                              Array.apply(null, { length: 32 }).map(Function.call, Number).map((day) => {
                                if (day > 0)
                                  return <div className="Give-val day" data-value={day < 10 ? `0${day}` : day} data-name='date' onClick={handleAttr}>{day < 10 ? `0${day}` : day}</div>
                              })
                            }

                          </div>
                        </Scrollbars>
                      </div>
                    </div>
                    <div class="form-group select-group new-select  month-select">
                      <label for="reviewFormSelect" class="form-label">*Month</label>
                      <div class="select-selected">Select</div>
                    </div>
                    <div className="form-group select-group old-select  month-select hide">
                      <label for="reviewFormSelect" className="form-label">*Month</label>
                      <div className="select-wrap" >
                        <Scrollbars style={{ height: 200 }}>

                          <div required className="form-control" name="date" id="reviewFormSelect">

                            <div className="Give-val month" data-value="01" data-name="date" onClick={handleAttr}>January</div >
                            <div className="Give-val month" data-value="02" data-name="date" onClick={handleAttr}>February</div >
                            <div className="Give-val month" data-value="03" data-name="date" onClick={handleAttr}>March</div >
                            <div className="Give-val month" data-value="04" data-name="date" onClick={handleAttr}>April</div >
                            <div className="Give-val month" data-value="05" data-name="date" onClick={handleAttr}>May</div >
                            <div className="Give-val month" data-value="06" data-name="date" onClick={handleAttr}>June</div >
                            <div className="Give-val month" data-value="07" data-name="date" onClick={handleAttr}>July</div >
                            <div className="Give-val month" data-value="08" data-name="date" onClick={handleAttr}>August</div >
                            <div className="Give-val month" data-value="09" data-name="date" onClick={handleAttr}>September</div >
                            <div className="Give-val month" data-value="10" data-name="date" onClick={handleAttr}>October</div >
                            <div className="Give-val month" data-value="11" data-name="date" onClick={handleAttr}>November</div >
                            <div className="Give-val month" data-value="12" data-name="date" onClick={handleAttr}>December</div >

                          </div>
                        </Scrollbars>
                      </div>
                    </div>

                  </div>
                  <div class="form-group select-group new-select  year-select">
                    <label for="reviewFormSelect" class="form-label">*Year</label>
                    <div class="select-selected">Select</div>
                  </div>

                  <div className="form-group select-group old-select  year-select hide">
                    <label for="reviewFormSelect" className="form-label">*Year</label>

                    <div className="select-wrap">
                      <Scrollbars style={{ height: 200 }}>
                        <div required className="form-control" name="date" id="reviewFormSelectYear">

                          {yearsList.reverse().map((item, index) => {
                            return (
                              <div className="Give-val year" data-value={item} data-name="date" onClick={handleAttr}>{item}</div >
                            )
                          })}
                        </div>
                      </Scrollbars>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

          <div className="row d-lg-none">
            <div className="col-12">
              <div className={accountsettings.csTitle}>Customer Service</div>
              <div className={accountsettings.csText}>Our Customer Service Representatives are available to assist you Monday through Friday, from 7am – 4pm PST at <span className={accountsettings.csNumber}>1-800-636-7546</span>.</div>
            </div>
          </div>
          <div class="row">
            <div class=" col-12">
              <p class="mb-16">Obagi will never sell, rent, or share your personal information with any third parties for marketing purposes without your express permission. By submitting your information, you confirm you have read and agree with the terms of our Privacy Policy.</p>

            </div>
          </div>
          <div className={["row", accountsettings.saveRow].join(" ")}>
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
    </UserAccount >
  )
}
