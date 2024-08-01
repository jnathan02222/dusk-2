
function pre_main() {
    storage_params = [];
    storage_params["storage.standalone"] = true;
    storage_params["storage.passcode"] = "0000000000000000";
    storage_params["storage.scenarioId"] = 30445;
    storage_params["storage.userId"] = -1;
    storage_params["storage.userName"] = "";
  
    var appletFile="greenfoot.jar";
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", appletFile);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
        JSZip.loadAsync(xhr.response).then(function (zip) {
            window.zip = zip;
            main();
            // Wait half a second for initialisation to complete before starting:
            window.setTimeout(function() {
              runButton = document.getElementById("playButton");
              // Only simulate run click if scenario not auto-started:
              runButton.click();
              
            }, 500);
        });
    };
    
    xhr.onerror = function() {
        // ??
        alert("Failed to load applet.");
    };
    
    xhr.send();
  }
pre_main();