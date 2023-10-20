import React, { Component } from 'react';

class FacebookShareButton extends Component {
  componentDidMount() {
    // Carga el SDK de Facebook
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '644428504486491',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v11.0',
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  render() {
    return (
      <div className="fb-share-button" data-href="http://localhost:3000/viewfile?urlFile=/uploads/2ef9df7ebd02c44b6f9da66c88e76f58.pdf" data-layout="button_count"></div>
    );
  }
}

export default FacebookShareButton;