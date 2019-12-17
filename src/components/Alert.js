import React from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import '../styles/Alert.scss';

library.add(faCheck);

class Alert extends React.Component {

    render() {

      const {showAlert, errorNew} = this.props;
      const alertTxt = "New Book added to the list";

            return (
              <span>
              {(showAlert && !errorNew) &&
                         <div className={`alert alert-success ${showAlert ? 'alert-shown' : 'alert-hidden'}`}>
                           <strong>Saved!&nbsp;</strong>{alertTxt}&nbsp;&nbsp;<FontAwesomeIcon icon={faCheck} size="lg"/>
                           <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                         </div>}
              </span>
             );

    }
}

export default Alert;
