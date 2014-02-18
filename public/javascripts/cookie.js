(function () {
  var docCookies = {
    getItem: function (sKey) {
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
          switch (vEnd.constructor) {
            case Number:
              sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
              break;
            case String:
              sExpires = "; expires=" + vEnd;
              break;
            case Date:
              sExpires = "; expires=" + vEnd.toUTCString();
              break;
          }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    }
  }
  var browserCookie = docCookies.getItem("user_id");
  var localStorageCookie = localStorage.getItem("cookie");
  if(browserCookie) {
    console.log("browser cookie is present");
    if(localStorageCookie) {
      console.log("cookie is in localStorage");
      // make sure localStorage cookie and browser cookie are equal
      if(localStorageCookie == browserCookie) {
        // if they are equal all is good
        console.log("cookies are equal");
      } else {
          // if they are not equal, something bad has happend
          // localStorage cookie should take presendence
          console.log("cookie are not equal \n going to make them equal");
          docCookies.setItem("user_id", localStorageCookie);
          location.reload();
        }
    } else {
        console.log("cookie is not in local storage");
        localStorage.setItem("cookie", browserCookie);
        location.reload();
      }
  } else {
    console.log("not present");
  }
}) ();
