import React, { useEffect } from 'react';


// Wrap the require in check for window

const Popup = ({ node, props }) => {

  useEffect(() => {
    var myModalEl = document.getElementById('VideoPopUp')
    myModalEl.addEventListener('hidden.bs.modal', function (e) {
      // do something...
      document.querySelector('#VideoPopUp .video-popup-wrap').innerHTML = null;
    })
  })
  

  return (

    <div class="modal fade" id="VideoPopUp" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            {/* <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body video-popup-wrap embed-responsive embed-responsive-16by9">

          </div>
          {/* <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div> */}
        </div>
      </div>
    </div>
  )

}
export default Popup