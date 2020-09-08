import React from 'react'
import UserAccount from '../../components/user-account'
import myAccountStyles from '../../assets/scss/components/my-account.module.scss'
import AddressBox from '../../components/address-box'
import AddressModal from '../../components/address-modal'

export default function AddressBook() {
    return (
        <UserAccount activeTab="address-book">
            <div className="tab-pane active" id="address-book" role="tabpanel">

                <div className={[myAccountStyles.secondTitleWrapper, "d-none d-lg-flex"].join(" ")}>
                    <div className={myAccountStyles.secondTitle}>Address Book</div>
                    <button type="button" className={myAccountStyles.addressButton} data-toggle="modal" data-target="#address-modal">Add Address</button>
                </div>
                <AddressBox />
                <button type="button" className={[myAccountStyles.addressButton, "d-lg-none"].join(" ")} data-toggle="modal" data-target="#address-modal">Add Address</button>
            </div>
            <AddressModal />
        </UserAccount>
    )
}
